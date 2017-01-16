package me.skynda.vehicle.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.SearchResponseDto;
import me.skynda.common.interfaces.daos.*;
import me.skynda.common.interfaces.services.IBlobStorageService;
import me.skynda.common.interfaces.services.IVehicleService;
import me.skynda.image.entities.Image;
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

@Service
@Transactional
public class VehicleService implements IVehicleService {

    private final VehicleDao vehicleDao;
    private final VehicleModelDao vehicleModelDao;
    private final IVehicleReportItemDao vehicleReportItemDao;
    private final VehicleDescriptionDao vehicleDescriptionDao;
    private final VehicleFeatureDao vehicleFeatureDao;
    private final VehicleFaultDao vehicleFaultDao;
    private final VehicleImageDao vehicleImageDao;
    private final Mapper mapper;
    private final IBlobStorageService blobStorageService;
    private VehicleValidator validator = new VehicleValidator();

    @Autowired
    public VehicleService(
            IVehicleReportItemDao vehicleReportItemDao,
            VehicleDao vehicleDao,
            VehicleModelDao vehicleModelDao,
            VehicleDescriptionDao vehicleDescriptionDao,
            VehicleFeatureDao vehicleFeatureDao,
            VehicleFaultDao vehicleFaultDao,
            VehicleImageDao vehicleImageDao,
            Mapper mapper,
            IBlobStorageService blobStorageService) {
        this.vehicleReportItemDao = vehicleReportItemDao;
        this.vehicleDao = vehicleDao;
        this.vehicleModelDao = vehicleModelDao;
        this.vehicleDescriptionDao = vehicleDescriptionDao;
        this.vehicleFeatureDao = vehicleFeatureDao;
        this.vehicleFaultDao = vehicleFaultDao;
        this.vehicleImageDao = vehicleImageDao;
        this.mapper = mapper;
        this.blobStorageService = blobStorageService;
    }

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
        boolean mainImageUrlChanged;    // did the image change?
        if (vehicleAdminDto.getId() != null) {
            vehicle = vehicleDao.get(vehicleAdminDto.getId());
            vehicle.setModel(null); // hack, unset value or there will be error: "org.hibernate.HibernateException: identifier of an instance of me.skynda.vehicle.entities.VehicleModel was altered from 3 to 7". This is because automapper maps only an id of a persisted object, which id should not be changed.
            vehicle.setColorInside(null);
            vehicle.setColorOutside(null);
            mainImageUrlChanged = ImageDto.Helper.isUrlChanged(vehicle, vehicleAdminDto);   // do the check before mapping
            mapper.map(vehicleAdminDto, vehicle);
//            vehicle.setUpdated(new Date());   // TODO
        } else {
            vehicle = mapper.map(vehicleAdminDto, Vehicle.class);
            vehicle.setCreated(new Date());
            mainImageUrlChanged = ImageDto.Helper.isUrlChanged(null, vehicleAdminDto);   // do the check before mapping
        }

        /*
            Find car model
         */
        if (vehicleAdminDto.getModel() != null) {
            VehicleModel vehicleModel = vehicleModelDao.get(vehicleAdminDto.getModel().getId());
            vehicle.setModel(vehicleModel);
        }

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
        Image mainImage = blobStorageService.handleMedia(vehicleAdminDto.getMainImage(), vehicle.getMainImage(), mainImageUrlChanged);
        vehicle.setMainImage(mainImage);

        // Upload image gallery
        List<ImageContainerDto> imageDtos = vehicleAdminDto.getImages() != null ? vehicleAdminDto.getImages() : new ArrayList<>();
        if (imageDtos != null) {
            imageDtos.forEach(blobStorageService::fromBase64ToUrl);
        }

        // Upload faults images
        List<FaultBaseDto> faultDtos = vehicleAdminDto.getFaults();
        if (faultDtos != null) {
            faultDtos.forEach(blobStorageService::fromBase64ToUrl);
        }

        /*
            Clean file could storage from uploaded files
         */

        List<VehicleDtoImageFileToDelete> filesToDelete = vehicleAdminDto.getFilesToDelete();
        if (filesToDelete != null) {
            filesToDelete.forEach(blobStorageService::tryDeleteBlob);
        }

        /*
            Add Vehicle to the database TODO: If some logic fails after this code, then undo transaction
         */

        vehicle.setCreated(new Date());
        Vehicle addedVehicle = vehicleDao.saveOrUpdate(vehicle);    // TODO: Get success code

        /*
            Save all the one-2-many relations with vehicle-to-be-sold
         */

//        vehicleReportItemDao.addMultipleToVehicle(addedVehicle, vehicleAdminDto.getReportItems());
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

        vehicles.forEach(vehicle -> searchResultsDto.add(mapper.map(vehicle, VehicleSearchDto.class)));

        response.setSuccess(!searchResultsDto.isEmpty());
        response.setVehicles(searchResultsDto);

        return response;
    }
}
