package me.skynda.car.service;

import me.skynda.blobstorage.dto.DeleteBlobDto;
import me.skynda.blobstorage.dto.UploadBlobDto;
import me.skynda.blobstorage.dto.response.BlobStorageUploadStreamResponseDto;
import me.skynda.blobstorage.service.BlobStorageService;
import me.skynda.car.dao.*;
import me.skynda.car.dto.*;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarModels;
import me.skynda.car.service.converter.CarConverter;
import me.skynda.car.validators.CarValidator;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.helper.SkyndaUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.*;

@Service
@Transactional
public class CarServiceImpl implements CarService {

    private final String DEFAULT_CONTAINER_NAME = "skynda";

    @Autowired
    CarDao carDao;

    @Autowired
    CarModelsDao carModelsDao;

    @Autowired
    CarFeatureDao carFeatureDao;

    @Autowired
    CarFaultDao carFaultDao;

    @Autowired
    CarImageDao carImageDao;

    @Autowired
    private BlobStorageService blobStorageService;

    @Autowired
    private CarConverter carConverter;

    @Override
    public List<SingleCarDataDto> getCars() {
        List<SingleCarDataDto> singleCarDataDto = new ArrayList<SingleCarDataDto>();
        carDao.getAll().forEach(c -> {
            singleCarDataDto.add(carConverter.transform(c));
        });
        return singleCarDataDto;
    }

    @Override
    public CarDto getCar(Long id) {
        Car model = carDao.get(id);
        return carConverter.transformToCarDto(model);
    }

    @Override
    public SingleCarDataDto getCarDetailed(Long id) {
        Car model = carDao.get(id);
        return carConverter.transform(model);
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdateCarForSale(CarDto carDto, BindingResult bindingResult) {
        Car car = carConverter.transform(carDto);

        CarModels carModel = carModelsDao.getByModelCode(carDto.getCarModelsCode());
        car.setCarModels(carModel);

        CarValidator validator = new CarValidator();
        validator.validate(car, bindingResult);
        if (bindingResult.hasErrors()) {
            CreateOrUpdateResponseDto response = new CreateOrUpdateResponseDto();
            response.setSuccess(false);
            response.setErrors(bindingResult.getAllErrors());
            return response;
        }

        /*
            Upload filesToUpload and get uploaded url-s
         */

        // Upload main image
        Optional<String> base64FileOptional = SkyndaUtility.resolve(() -> carDto.getFilesToUpload().getMainImageFile());
        if (base64FileOptional != null) {
            String base64File = base64FileOptional.get();

            // Please, upload the fucking file!!!
            UploadBlobDto uploadBlobDto1 = new UploadBlobDto();
            uploadBlobDto1.setContainerName(DEFAULT_CONTAINER_NAME);
            String blobName = UUID.randomUUID().toString();
            uploadBlobDto1.setBlobName(blobName);
            uploadBlobDto1.setByteArray(SkyndaUtility.toBytearray(base64File));
            BlobStorageUploadStreamResponseDto responseDto1 = blobStorageService.uploadStream(uploadBlobDto1);

            // READY-HEHEHE!! Put ze file intu ze kar!
            if (responseDto1.isSuccess()) {
                car.setMainImageUrl(responseDto1.getUri());
                car.setMainImageBlobName(blobName);
                car.setMainImageContainerName(DEFAULT_CONTAINER_NAME);
            }
        }

        // Upload image gallery
        List<ImagesDto> images = carDto.getImages() != null ? carDto.getImages() : new ArrayList<>();
        List<String> imageFiles = carDto.getFilesToUpload().getImageFiles();
        imageFiles.forEach(file -> {

            // Upload the fucking file, JIM!
            UploadBlobDto uploadBlobDto = new UploadBlobDto();
            uploadBlobDto.setContainerName(DEFAULT_CONTAINER_NAME);
            String blobName = UUID.randomUUID().toString();
            uploadBlobDto.setBlobName(blobName);
            uploadBlobDto.setByteArray(SkyndaUtility.toBytearray(file));
            BlobStorageUploadStreamResponseDto responseDto = blobStorageService.uploadStream(uploadBlobDto);

            // Aww yeah, successful, right?
            if (responseDto.isSuccess()) {
                ImagesDto dto = new ImagesDto();
                dto.setOriginal(responseDto.getUri());
                dto.setBlobName(blobName);
                dto.setContainerName(DEFAULT_CONTAINER_NAME);
                images.add(dto);
            }
        });

        // Upload faults images
        List<FaultsDto> faults = carDto.getFaults();
        faults.forEach(fault -> {
            // Do we have a file, sir?
            if (fault.getBase64File().isEmpty())
                return;

            // Upload the file, Jim!
            UploadBlobDto uploadBlobDto = new UploadBlobDto();
            uploadBlobDto.setContainerName(DEFAULT_CONTAINER_NAME);
            String blobName = UUID.randomUUID().toString();
            uploadBlobDto.setBlobName(blobName);
            uploadBlobDto.setByteArray(SkyndaUtility.toBytearray(fault.getBase64File()));
            BlobStorageUploadStreamResponseDto responseDto = blobStorageService.uploadStream(uploadBlobDto);

            // File upload successful, Jim, isn't it?
            if (responseDto.isSuccess()) {
                fault.setImg(responseDto.getUri());
                fault.setBlobName(blobName);
                fault.setContaienrName(DEFAULT_CONTAINER_NAME);
                fault.setBase64File(null);
            }

        });

        /*
            Clean file could storage from uploaded files
         */

        carDto.getFilesToDelete().forEach(this::tryDeleteBlob);

        /*
            Add Car to the database TODO: If some logic fails after this code, then undo transaction
         */

        car.setCreated(new Date());
        Car addedCar = carDao.saveOrUpdate(car);    // TODO: Get success code

        /*
            Save all the one-2-many relations with car-to-be-sold
         */

        carFeatureDao.addMultipleToCar(addedCar, carDto.getFeatures());
        carFaultDao.addMultipleToCar(addedCar, faults);
        carImageDao.addMultipleToCar(addedCar, images);

        CreateOrUpdateResponseDto response = new CreateOrUpdateResponseDto();
        response.setId(addedCar.getId());
        response.setSuccess(true);
        return response;
    }

    @Override
    public DeleteResponseDto deleteCar(Long id) {
        carDao.delete(id);  // TODO: make somehow sure that the item has been deleted.

        DeleteResponseDto response = new DeleteResponseDto();
        response.setSuccess(true);
        return response;
    }

    private void tryDeleteBlob(CarDtoImageFileToDelete dto) {
        if (dto == null || dto.getBlobName() == null || dto.getBlobName().isEmpty())
            return;

        String blobName = dto.getBlobName();
        String containerName = dto.getContainerName() != null ? DEFAULT_CONTAINER_NAME : dto.getContainerName();

        try {
            DeleteBlobDto deleteBlobDto = new DeleteBlobDto();
            deleteBlobDto.setBlobName(blobName);
            deleteBlobDto.setContainerName(containerName);
            blobStorageService.delete(deleteBlobDto);
        } catch(Exception ex) {}
    }
}
