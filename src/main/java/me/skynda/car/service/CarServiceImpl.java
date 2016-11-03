package me.skynda.car.service;

import me.skynda.blobstorage.dto.DeleteBlobDto;
import me.skynda.blobstorage.dto.UploadBlobDto;
import me.skynda.blobstorage.dto.response.BlobStorageUploadStreamResponseDto;
import me.skynda.blobstorage.service.BlobStorageService;
import me.skynda.car.dao.*;
import me.skynda.car.dto.CarDto;
import me.skynda.car.dto.CarGeneralDto;
import me.skynda.car.dto.SingleCarDataDto;
import me.skynda.car.dto.request.CarSearchRequestDto;
import me.skynda.car.dto.response.CarModelResponseDto;
import me.skynda.car.dto.*;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarModels;
import me.skynda.car.service.converter.CarConverter;
import me.skynda.car.validators.CarValidator;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.SearchResponseDto;
import me.skynda.common.dto.UpdateResponseDto;
import me.skynda.common.helper.SkyndaUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
        ImageContainerDto base64File = SkyndaUtility.resolve(carDto::getMainImageContainer).get();
        if (base64File.getBase64File() != null) {
            // Please, upload the fucking file!!!
            UploadBlobDto uploadBlobDto1 = new UploadBlobDto();
            uploadBlobDto1.setContainerName(DEFAULT_CONTAINER_NAME);
            String blobName = UUID.randomUUID().toString();
            uploadBlobDto1.setBlobName(blobName);
            uploadBlobDto1.setByteArray(SkyndaUtility.toBytearray(base64File.getBase64File()));
            BlobStorageUploadStreamResponseDto responseDto1 = blobStorageService.uploadStream(uploadBlobDto1);

            // Was upload successful?
            if (responseDto1.isSuccess()) {
                car.setMainImageUrl(responseDto1.getUri());
                car.setMainImageBlobName(blobName);
                car.setMainImageContainerName(DEFAULT_CONTAINER_NAME);
            }
        }

        // Upload image gallery
        List<ImagesDto> imageDtos = carDto.getImages() != null ? carDto.getImages() : new ArrayList<>();
        imageDtos.forEach(imageDto -> {
            String imageBase64File = imageDto.getImageContainer() != null
                ? imageDto.getImageContainer().getBase64File()
                : null;
            if (imageBase64File == null || imageBase64File.isEmpty())
                return;

            // Upload the fucking file, JIM!
            UploadBlobDto uploadBlobDto = new UploadBlobDto();
            uploadBlobDto.setContainerName(DEFAULT_CONTAINER_NAME);
            String blobName = UUID.randomUUID().toString();
            uploadBlobDto.setBlobName(blobName);
            uploadBlobDto.setByteArray(SkyndaUtility.toBytearray(imageBase64File));
            BlobStorageUploadStreamResponseDto responseDto = blobStorageService.uploadStream(uploadBlobDto);

            // Aww yeah, successful, right?
            if (responseDto.isSuccess()) {
                imageDto.getImageContainer().setImageUrl(responseDto.getUri());
                imageDto.getImageContainer().setBlobName(blobName);
                imageDto.getImageContainer().setContainerName(DEFAULT_CONTAINER_NAME);
                imageDto.getImageContainer().setBase64File(null);
            }
        });

        // Upload faults images
        List<FaultsDto> faultDtos = carDto.getFaults();
        faultDtos.forEach(faultDto -> {
            String faultBase64File = faultDto.getImageContainer() != null
                    ? faultDto.getImageContainer().getBase64File()
                    : null;
            if (faultBase64File == null || faultBase64File.isEmpty())
                return;

            // Upload the file, Jim!
            UploadBlobDto uploadBlobDto = new UploadBlobDto();
            uploadBlobDto.setContainerName(DEFAULT_CONTAINER_NAME);
            String blobName = UUID.randomUUID().toString();
            uploadBlobDto.setBlobName(blobName);
            uploadBlobDto.setByteArray(SkyndaUtility.toBytearray(faultBase64File));
            BlobStorageUploadStreamResponseDto responseDto = blobStorageService.uploadStream(uploadBlobDto);

            // File upload successful, Jim, isn't it?
            if (responseDto.isSuccess()) {
                faultDto.getImageContainer().setImageUrl(responseDto.getUri());
                faultDto.getImageContainer().setBlobName(blobName);
                faultDto.getImageContainer().setContainerName(DEFAULT_CONTAINER_NAME);
                faultDto.getImageContainer().setBase64File(null);
            }
        });

        /*
            Clean file could storage from uploaded files
         */

        List<CarDtoImageFileToDelete> filesToDelete = carDto.getFilesToDelete();
        if (filesToDelete != null) {
            for (CarDtoImageFileToDelete fileToDelete : filesToDelete) {
                tryDeleteBlob(fileToDelete);
            }
        }

        /*
            Add Car to the database TODO: If some logic fails after this code, then undo transaction
         */

        car.setCreated(new Date());
        Car addedCar = carDao.saveOrUpdate(car);    // TODO: Get success code

        /*
            Save all the one-2-many relations with car-to-be-sold
         */

        carFeatureDao.addMultipleToCar(addedCar, carDto.getFeatures());
        carFaultDao.addMultipleToCar(addedCar, faultDtos);
        carImageDao.addMultipleToCar(addedCar, imageDtos);

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

    @Override
    public SearchResponseDto search(CarSearchRequestDto params) {
        SearchResponseDto response = new SearchResponseDto();
        List<CarGeneralDto> carsGeneralDto = new ArrayList<>();
        List<Car> cars = carDao.getAll();

        if(params.Brands != null){

        }

        if(params.Colors != null){

        }

        if(params.Features != null){

        }

        if(params.Doors != null){

        }

        if(params.Seats != null){

        }

        if(params.Transmission != null){

        }

        if(params.Mileage != null){

        }

        if(params.Price != null){

        }

        if(params.Year != null){

        }

        if(params.PetrolConsumption != null){

        }

        if(params.Power != null){

        }

        cars.forEach(car -> {
            carsGeneralDto.add(carConverter.convertToSearchableCar(car));
        });


        response.setSuccess(true);
        response.setCars(carsGeneralDto);

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
