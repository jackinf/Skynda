package me.skynda.vehicle.service;

import me.skynda.auth.service.UserService;
import me.skynda.blobstorage.dto.DeleteBlobDto;
import me.skynda.blobstorage.dto.UploadBlobDto;
import me.skynda.blobstorage.dto.response.BlobStorageUploadStreamResponseDto;
import me.skynda.blobstorage.service.BlobStorageService;
import me.skynda.common.dao.ImageDao;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.SearchResponseDto;
import me.skynda.common.entity.Image;
import me.skynda.common.helper.SkyndaUtility;
import me.skynda.vehicle.dao.*;
import me.skynda.vehicle.dto.*;
import me.skynda.vehicle.dto.interfaces.IImageContainerableDto;
import me.skynda.vehicle.dto.request.VehicleSearchRequestDto;
import me.skynda.vehicle.entity.Vehicle;
import me.skynda.vehicle.entity.VehicleModel;
import me.skynda.vehicle.service.converter.VehicleConverter;
import me.skynda.vehicle.validators.VehicleValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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
    private ImageDao imageDao;

    @Autowired
    private VehicleConverter vehicleConverter;

    @Autowired
    UserService userService;

    //    @Autowired
    private VehicleValidator validator = new VehicleValidator();

    @Override
    public List<VehicleDisplayDto> getVehicles() {
        List<VehicleDisplayDto> vehicles = new ArrayList<>();
        vehicleDao.getAll().forEach(c -> {
            vehicles.add(vehicleConverter.transform(c));
        });
        return vehicles;
    }

    @Override
    public VehicleDto getVehicle(Long id) {
        Vehicle model = vehicleDao.get(id);
        return vehicleConverter.transformToVehicleDto(model);
    }

    @Override
    public VehicleDisplayDto getVehicleDetailed(Long id) {
        Vehicle model = vehicleDao.get(id);
        return vehicleConverter.transform(model);
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdateVehicle(VehicleDto vehicleDto, BindingResult bindingResult) {
        /*
            Create new or load existing
         */
        Vehicle vehicle;
        if (vehicleDto.getId() != null) {
            vehicle = vehicleDao.get(vehicleDto.getId());
            vehicle = vehicleConverter.transform(vehicleDto, vehicle);
//            vehicle.setUpdated(new Date());   // TODO
        } else {
            vehicle = vehicleConverter.transform(vehicleDto);
            vehicle.setCreated(new Date());
        }

        /*
            Find car model
         */
        VehicleModel vehicleModel = vehicleModelsDao.getByModelCode(vehicleDto.getVehicleModelsCode());
        vehicle.setModel(vehicleModel);

        /*
            Get a new creator
         */
        vehicle.setOwnerId(1);  // TODO: use owner

//        String currentLogin = SecurityUtils.getCurrentLogin();
//        if (currentLogin != null && !currentLogin.isEmpty()) {
//            UserDto byLogin = userService.findByLogin(currentLogin);
//            if (byLogin != null) {
//                vehicle.setOwnerId(byLogin.getId());
//            } else {
//                return CreateOrUpdateResponseDto.Factory.fail();
//            }
//        } else {
//            return CreateOrUpdateResponseDto.Factory.fail();
//        }

        /*
            Get images
         */
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
                Image image = imageDao.save(Image.Factory.create(responseDto1.getUri(), blobName, DEFAULT_CONTAINER_NAME));
                vehicle.setMainImage(image);
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
        List<Vehicle> vehicles = vehicleDao.search(params);

        vehicles.forEach(vehicle -> {
            vehiclesGeneralDto.add(vehicleConverter.convertToSearchableVehicle(vehicle));
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
