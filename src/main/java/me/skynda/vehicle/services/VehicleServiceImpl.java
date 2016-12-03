package me.skynda.vehicle.services;

import me.skynda.auth.service.UserService;
import me.skynda.blobstorage.dto.DeleteBlobDto;
import me.skynda.blobstorage.dto.UploadBlobDto;
import me.skynda.blobstorage.dto.response.BlobStorageUploadStreamResponseDto;
import me.skynda.blobstorage.service.BlobStorageService;
import me.skynda.common.interfaces.daos.ImageDao;
import me.skynda.common.dto.SearchResponseDto;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.image.entities.Image;
import me.skynda.common.helper.SkyndaUtility;
import me.skynda.common.interfaces.daos.*;
import me.skynda.vehicle.dto.ImageContainerBaseDto;
import me.skynda.common.interfaces.services.VehicleService;
import me.skynda.vehicle.dto.*;
import me.skynda.vehicle.dto.request.SearchRequestDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleModel;
import me.skynda.vehicle.validators.VehicleValidator;
import org.dozer.Mapper;
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

    public static String DEFAULT_CONTAINER_NAME = "skynda";

    @Autowired
    VehicleDao vehicleDao;

    @Autowired
    VehicleModelDao vehicleModelDao;

    @Autowired
    VehicleReportItemDao vehicleReportItemDao;

    @Autowired
    VehicleDescriptionDao vehicleDescriptionDao;

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
    private Mapper mapper;

    @Autowired
    UserService userService;

    //    @Autowired
    private VehicleValidator validator = new VehicleValidator();

    @Override
    public List<VehicleDetailedDto> getVehicles() {
        List<VehicleDetailedDto> vehicles = new ArrayList<>();
        vehicleDao.getAll().forEach(c -> {
            if(c.getArchived() == null)
                vehicles.add(mapper.map(c, VehicleDetailedDto.class));
        });
        return vehicles;
    }

    @Override
    public VehicleAdminDto getVehicle(Integer id) {
        Vehicle model = vehicleDao.get(id);
        return mapper.map(model, VehicleAdminDto.class);
    }

    @Override
    public VehicleDetailedDto getVehicleDetailed(Integer id) {
        Vehicle model = vehicleDao.get(id);
        return mapper.map(model, VehicleDetailedDto.class);
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdateVehicle(VehicleAdminDto vehicleAdminDto, BindingResult bindingResult) {
        /*
            Create new or load existing
         */
        Vehicle vehicle;
        if (vehicleAdminDto.getId() != null) {
            vehicle = vehicleDao.get(vehicleAdminDto.getId());
            mapper.map(vehicleAdminDto, vehicle);
//            vehicle.setUpdated(new Date());   // TODO
        } else {
            vehicle = mapper.map(vehicleAdminDto, Vehicle.class);
            vehicle.setCreated(new Date());
        }
        /*
            Find car model
         */
        VehicleModel vehicleModel = vehicleModelDao.get(vehicleAdminDto.getModel().getId());
        vehicle.setModel(vehicleModel);

        /*
            Get a new creator
         */
        vehicle.setOwnerId(1);  // TODO: use owner

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
        ImageDto base64File = vehicleAdminDto.getMainImage();
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
        List<ImageContainerDto> imageDtos = vehicleAdminDto.getImages() != null ? vehicleAdminDto.getImages() : new ArrayList<>();
        if (imageDtos != null) {
            imageDtos.forEach(this::fromBase64ToUrl);
        }

        // Upload faults images
        List<FaultBaseDto> faultDtos = vehicleAdminDto.getFaults();
        if (faultDtos != null) {
            faultDtos.forEach(this::fromBase64ToUrl);
        }

        /*
            Clean file could storage from uploaded files
         */

        List<VehicleDtoImageFileToDelete> filesToDelete = vehicleAdminDto.getFilesToDelete();
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

        vehicleReportItemDao.addMultipleToVehicle(addedVehicle, vehicleAdminDto.getReportItems());
        vehicleDescriptionDao.addMultipleToVehicle(addedVehicle, vehicleAdminDto.getDescriptions());
        vehicleFeatureDao.addMultipleToVehicle(addedVehicle, vehicleAdminDto.getFeatures());
        vehicleFaultDao.addMultipleToVehicle(addedVehicle, faultDtos);
        vehicleImageDao.addMultipleToVehicle(addedVehicle, imageDtos);

        CreateOrUpdateResponseDto response = new CreateOrUpdateResponseDto();
        response.setId(addedVehicle.getId());
        response.setSuccess(true);
        return response;
    }

    @Override
    public DeleteResponseDto deleteVehicle(Integer id) {
        vehicleDao.delete(id);  // TODO: make somehow sure that the item has been deleted.
        return DeleteResponseDto.Factory.success();
    }

    @Override
    public SearchResponseDto search(SearchRequestDto params) {
        SearchResponseDto response = new SearchResponseDto();
        List<VehicleSearchDto> searchResultsDto = new ArrayList<>();
        List<Vehicle> vehicles = vehicleDao.search(params);

        vehicles.forEach(vehicle -> {
            searchResultsDto.add(mapper.map(vehicle, VehicleSearchDto.class));
        });

        response.setSuccess(!searchResultsDto.isEmpty());
        response.setVehicles(searchResultsDto);

        return response;
    }

    private void fromBase64ToUrl(ImageContainerBaseDto dto) {
        String faultBase64File = dto.getImage() != null
                ? dto.getImage().getBase64File()
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
            dto.getImage().setUrl(responseDto.getUri());
            dto.getImage().setBlobName(blobName);
            dto.getImage().setContainerName(DEFAULT_CONTAINER_NAME);
            dto.getImage().setBase64File(null);
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
