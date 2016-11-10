package me.skynda.vehicle.service;

import me.skynda.blobstorage.dto.DeleteBlobDto;
import me.skynda.blobstorage.dto.UploadBlobDto;
import me.skynda.blobstorage.dto.response.BlobStorageUploadStreamResponseDto;
import me.skynda.blobstorage.service.BlobStorageService;
import me.skynda.vehicle.dao.*;
import me.skynda.vehicle.dto.*;
import me.skynda.vehicle.dto.interfaces.IImageContainerableDto;
import me.skynda.vehicle.dto.request.VehicleSearchRequestDto;
import me.skynda.vehicle.model.Vehicle;
import me.skynda.vehicle.model.VehicleModel;
import me.skynda.vehicle.service.converter.VehicleConverter;
import me.skynda.vehicle.validators.VehicleValidator;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.SearchResponseDto;
import me.skynda.common.helper.SkyndaUtility;
import me.skynda.vehicle.dto.SingleVehicleDataDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.*;

@Service
@Transactional
public class VehicleServiceImpl implements VehicleService {

    private final String DEFAULT_CONTAINER_NAME = "skynda";

    @Autowired
    VehicleDao vehicleDao;

    @Autowired
    VehicleModelsDao vehicleModelsDao;

    @Autowired
    VehicleFeatureDao vehicleFeatureDao;

    @Autowired
    VehicleFaultDao vehicleFaultDao;

    @Autowired
    VehicleImageDao vehicleImageDao;

    @Autowired
    private BlobStorageService blobStorageService;

    @Autowired
    private VehicleConverter vehicleConverter;

    //    @Autowired
    private VehicleValidator validator = new VehicleValidator();

    @Override
    public List<SingleVehicleDataDto> getVehicles() {
        List<SingleVehicleDataDto> singleVehicleDataDto = new ArrayList<SingleVehicleDataDto>();
        vehicleDao.getAll().forEach(c -> {
            singleVehicleDataDto.add(vehicleConverter.transform(c));
        });
        return singleVehicleDataDto;
    }

    @Override
    public VehicleDto getVehicle(Long id) {
        Vehicle model = vehicleDao.get(id);
        return vehicleConverter.transformToVehicleDto(model);
    }

    @Override
    public SingleVehicleDataDto getVehicleDetailed(Long id) {
        Vehicle model = vehicleDao.get(id);
        return vehicleConverter.transform(model);
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdateVehicle(VehicleDto vehicleDto, BindingResult bindingResult) {
        Vehicle vehicle = vehicleConverter.transform(vehicleDto);

        VehicleModel vehicleModel = vehicleModelsDao.getByModelCode(vehicleDto.getVehicleModelsCode());
        vehicle.setVehicleModel(vehicleModel);

        validator.validate(vehicle, bindingResult);
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
        ImageContainerDto base64File = vehicleDto.getMainImageContainer();
        if (base64File != null && base64File.getBase64File() != null) {
            // Please, upload the fucking file!!!
            UploadBlobDto uploadBlobDto1 = new UploadBlobDto();
            uploadBlobDto1.setContainerName(DEFAULT_CONTAINER_NAME);
            String blobName = UUID.randomUUID().toString();
            uploadBlobDto1.setBlobName(blobName);
            uploadBlobDto1.setByteArray(SkyndaUtility.toBytearray(base64File.getBase64File()));
            BlobStorageUploadStreamResponseDto responseDto1 = blobStorageService.uploadStream(uploadBlobDto1);

            // Was upload successful?
            if (responseDto1.isSuccess()) {
                vehicle.setMainImageUrl(responseDto1.getUri());
                vehicle.setMainImageBlobName(blobName);
                vehicle.setMainImageContainerName(DEFAULT_CONTAINER_NAME);
            }
        }

        // Upload image gallery
        List<ImagesDto> imageDtos = vehicleDto.getImages() != null ? vehicleDto.getImages() : new ArrayList<>();
        if (imageDtos != null) {
            imageDtos.forEach(this::fromBase64ToUrl);
        }

        // Upload faults images
        List<FaultsDto> faultDtos = vehicleDto.getFaults();
        if (faultDtos != null) {
            faultDtos.forEach(this::fromBase64ToUrl);
        }

        /*
            Clean file could storage from uploaded files
         */

        List<VehicleDtoImageFileToDelete> filesToDelete = vehicleDto.getFilesToDelete();
        if (filesToDelete != null) {
            filesToDelete.forEach(this::tryDeleteBlob);
        }

        /*
            Add Vehicle to the database TODO: If some logic fails after this code, then undo transaction
         */

        vehicle.setCreated(new Date());
        Vehicle addedVehicle = vehicleDao.saveOrUpdate(vehicle);    // TODO: Get success code

        /*
            Save all the one-2-many relations with vehicle-to-be-sold
         */

        vehicleFeatureDao.addMultipleToVehicle(addedVehicle, vehicleDto.getFeatures());
        vehicleFaultDao.addMultipleToVehicle(addedVehicle, faultDtos);
        vehicleImageDao.addMultipleToVehicle(addedVehicle, imageDtos);

        CreateOrUpdateResponseDto response = new CreateOrUpdateResponseDto();
        response.setId(addedVehicle.getId());
        response.setSuccess(true);
        return response;
    }

    @Override
    public DeleteResponseDto deleteVehicle(Long id) {
        vehicleDao.delete(id);  // TODO: make somehow sure that the item has been deleted.

        DeleteResponseDto response = new DeleteResponseDto();
        response.setSuccess(true);
        return response;
    }

    @Override
    public SearchResponseDto search(VehicleSearchRequestDto params) {
        SearchResponseDto response = new SearchResponseDto();
        List<VehicleGeneralDto> vehiclesGeneralDto = new ArrayList<>();
        List<Vehicle> cars = vehicleDao.search(params);

        cars.forEach(car -> {
            vehiclesGeneralDto.add(vehicleConverter.convertToSearchableVehicle(car));
        });

        response.setSuccess(true);
        response.setVehicles(vehiclesGeneralDto);

        return response;
    }

    private void fromBase64ToUrl(IImageContainerableDto dto) {
        String faultBase64File = dto.getImageContainer() != null
                ? dto.getImageContainer().getBase64File()
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
            dto.getImageContainer().setImageUrl(responseDto.getUri());
            dto.getImageContainer().setBlobName(blobName);
            dto.getImageContainer().setContainerName(DEFAULT_CONTAINER_NAME);
            dto.getImageContainer().setBase64File(null);
        }
    }

    private void tryDeleteBlob(VehicleDtoImageFileToDelete dto) {
        if (dto == null || dto.getBlobName() == null || dto.getBlobName().isEmpty())
            return;

        String blobName = dto.getBlobName();
        String containerName = dto.getContainerName() != null ? DEFAULT_CONTAINER_NAME : dto.getContainerName();

        try {
            DeleteBlobDto deleteBlobDto = new DeleteBlobDto();
            deleteBlobDto.setBlobName(blobName);
            deleteBlobDto.setContainerName(containerName);
            blobStorageService.delete(deleteBlobDto);
        } catch (Exception ex) {
        }
    }
}
