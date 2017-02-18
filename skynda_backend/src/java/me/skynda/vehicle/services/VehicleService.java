package me.skynda.vehicle.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.SearchResponseDto;
import me.skynda.common.entities.*;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.*;
import me.skynda.common.interfaces.services.IBlobStorageService;
import me.skynda.common.interfaces.services.IVehicleService;
import me.skynda.feature.dto.FeatureAdminSelectDto;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.dto.*;
import me.skynda.vehicle.dto.request.SearchRequestDto;
import me.skynda.vehicle.validators.VehicleValidator;
import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private final IVehicleDao vehicleDao;
    private final IVehicleModelDao vehicleModelDao;
    private final IVehicleDescriptionDao vehicleDescriptionDao;
    private final IVehicleFeatureDao vehicleFeatureDao;
    private final IFeatureDao featureDao;
    private final IVehicleImageDao vehicleImageDao;
    private final Mapper mapper;
    private final IBlobStorageService blobStorageService;
    private VehicleValidator validator = new VehicleValidator();

    private static Logger logger = LoggerFactory.getLogger(VehicleService.class);

    @Autowired
    public VehicleService(
            IVehicleDao vehicleDao,
            IVehicleModelDao vehicleModelDao,
            IVehicleDescriptionDao vehicleDescriptionDao,
            IVehicleFeatureDao vehicleFeatureDao,
            IVehicleImageDao vehicleImageDao,
            Mapper mapper,
            IBlobStorageService blobStorageService,
            IFeatureDao featureDao) {
        this.vehicleDao = vehicleDao;
        this.vehicleModelDao = vehicleModelDao;
        this.vehicleDescriptionDao = vehicleDescriptionDao;
        this.vehicleFeatureDao = vehicleFeatureDao;
        this.vehicleImageDao = vehicleImageDao;
        this.mapper = mapper;
        this.blobStorageService = blobStorageService;
        this.featureDao = featureDao;
    }

    @Override
    public List<VehicleDetailedDto> getVehicles() {
        try {
            List<VehicleDetailedDto> vehicles = new ArrayList<>();
            vehicleDao.getAll().forEach(c -> {
                if(c.getArchived() == null)
                    vehicles.add(mapper.map(c, VehicleDetailedDto.class));
            });
            return vehicles;
        } catch (Exception e) {
            logger.error("getVehicles failed.", e);
            throw e;
        }
    }

    @Override
    public VehicleAdminDto getVehicle(Integer id) {
        try {
            Vehicle model = vehicleDao.get(id);
            VehicleAdminDto dto = mapper.map(model, VehicleAdminDto.class);

            if(model.getVehicleFeatures() != null && !model.getVehicleFeatures().isEmpty()){
                List<FeatureAdminSelectDto> adminSelectDtos = new ArrayList<>();

                for (VehicleFeature vehicleFeature: model.getVehicleFeatures() ) {
                    FeatureAdminSelectDto dtoSelect = new FeatureAdminSelectDto();
                    dtoSelect.setValue(vehicleFeature.getFeature().getId());
                    dtoSelect.setLabel(vehicleFeature.getFeature().getName());
                    adminSelectDtos.add(dtoSelect);
                }

                dto.setFeaturesAdminSelect(adminSelectDtos);
            }

            return dto;
        } catch (Exception e) {
            logger.error("getVehicle failed. id: " + id, e);
            throw e;
        }
    }

    @Override
    public VehicleDetailedDto getVehicleDetailed(Integer id) {
        try {
            Vehicle model = vehicleDao.get(id);
            VehicleDetailedDto detailedDto = mapper.map(model, VehicleDetailedDto.class);
            detailedDto.calculateFuelAverage();
            if(!detailedDto.getReportCategories().isEmpty()){
                CategoriesDto categoriesDto = detailedDto.getReportCategories()
                        .stream().filter(x ->  x.getInspector() != null || !x.getInspector().isEmpty() )
                        .findFirst().orElse(null);
                if(categoriesDto != null && !categoriesDto.getInspector().isEmpty()){
                    detailedDto.setInspector(categoriesDto.getInspector());
                }

                List<FaultBaseDto> faults = new ArrayList<>();

                for (CategoriesDto category: detailedDto.getReportCategories()) {
                    for (FaultBaseDto fault: category.getFaults()) {
                        faults.add(fault);
                    }
                }

                detailedDto.setFaults(faults);
            }

            return detailedDto;
        } catch (Exception e) {
            logger.error("getVehicleDetailed failed. id: " + id, e);
            throw e;
        }
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdateVehicle(VehicleAdminDto vehicleAdminDto, BindingResult bindingResult) {
        try {
            Vehicle vehicle;
            boolean isMainImageUrlChanged;

            if (vehicleAdminDto.getId() != null) {
                vehicle = vehicleDao.get(vehicleAdminDto.getId());

                // hack, unset value or there will be error: "org.hibernate.HibernateException:
                // identifier of an instance of me.skynda.vehicle.entities.VehicleModel was altered from 3 to 7".
                // This is because automapper maps only an id of a persisted object, which id should not be changed.
                vehicle.setModel(null);

                vehicle.setColorInsideHex(null);
                vehicle.setColorOutsideHex(null);
                // vehicle.setUpdated(new Date());   // TODO
                // do the check before mapping
                isMainImageUrlChanged = ImageDto.Helper.isUrlChanged(vehicle, vehicleAdminDto);
                mapper.map(vehicleAdminDto, vehicle);
            } else {
                vehicle = mapper.map(vehicleAdminDto, Vehicle.class);
                vehicle.setCreated(new Date());
                isMainImageUrlChanged = ImageDto.Helper.isUrlChanged(null, vehicleAdminDto);   // do the check before mapping
            }

            if (vehicleAdminDto.getModel() != null) {
                VehicleModel vehicleModel = vehicleModelDao.get(vehicleAdminDto.getModel().getId());
                vehicle.setModel(vehicleModel);
            }

            vehicle.setOwnerId(1);  // TODO: use owner

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
            Image mainImage = blobStorageService.handleMedia(vehicleAdminDto.getMainImage(), vehicle.getMainImage(), isMainImageUrlChanged);
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

            Vehicle addedVehicle = vehicleDao.saveOrUpdate(vehicle);    // TODO: Get success code

            UpdateDescriptions(addedVehicle.getId(), vehicleAdminDto.getDescriptions());
            UpdateFeatures(addedVehicle, vehicleAdminDto.getFeaturesAdminSelect());
            UpdateImages(addedVehicle, imageDtos);

            CreateOrUpdateResponseDto response = new CreateOrUpdateResponseDto();
            response.setId(addedVehicle.getId());
            response.setSuccess(true);

            return response;
        } catch (Exception e) {
            logger.error("createOrUpdateVehicle failed. vehicleAdminDto: " + JsonHelper.toJson(vehicleAdminDto), e);
            throw e;
        }
    }

    private void UpdateFeatures(Vehicle vehicle, List<FeatureAdminSelectDto> featuresAdminSelect) {
        List<VehicleFeature> existingList = vehicleFeatureDao.getAllBy(vehicle.getId());
        if(existingList != null ){
            for (VehicleFeature item : existingList) {

                Boolean exists = !featuresAdminSelect.isEmpty() && featuresAdminSelect.stream()
                        .map(FeatureAdminSelectDto::getValue)
                        .anyMatch(item.getFeature().getId()::equals);

                if(!exists) {
                    DeleteResponseDto response = new DeleteResponseDto();
                    vehicleFeatureDao.deleteEntity(item, response);
                }
            }
        }

        if(featuresAdminSelect != null && !featuresAdminSelect.isEmpty()){

            for (FeatureAdminSelectDto descriptionDto : featuresAdminSelect) {

                Boolean exists = !existingList.isEmpty() && existingList.stream()
                        .map(entity -> mapper.map(entity, Feature.class))
                        .map(Feature::getId)
                        .anyMatch(descriptionDto.getValue()::equals);

                if(!exists){
                    VehicleFeature vehicleFeature = new VehicleFeature();
                    vehicleFeature.setVehicleId(vehicle.getId());
                    Feature feature = featureDao.get(descriptionDto.getValue());
                    vehicleFeature.setFeature(feature);
                    vehicleFeatureDao.save(vehicleFeature);
                }
            }
        }
    }

    private void UpdateImages(Vehicle addedVehicle, List<ImageContainerDto> imageDtos) {
        vehicleImageDao.addMultipleToVehicle(addedVehicle, imageDtos); //TODO to archive images ? or....

    }

    private void UpdateDescriptions(Integer vehicleId, List<VehicleDescriptionDto> descriptions) {
        List<VehicleDescription> existingList = vehicleDescriptionDao.getAllVehicleDescriptions(vehicleId);
        if(existingList != null ){
            for (VehicleDescription item : existingList) {

                Boolean exists = !descriptions.isEmpty() && descriptions.stream()
                        .map(VehicleDescriptionDto::getId)
                        .anyMatch(item.getId()::equals);

                if(!exists) {
                    DeleteResponseDto response = new DeleteResponseDto();
                    vehicleDescriptionDao.deleteEntity(item, response);
                }
            }
        }

        if(descriptions != null && !descriptions.isEmpty()){

            for (VehicleDescriptionDto descriptionDto : descriptions) {
                VehicleDescription vehicleDescription = mapper.map(descriptionDto, VehicleDescription.class);

                if(vehicleDescription.getVehicleId() == null){
                    vehicleDescription.setVehicleId(vehicleId);
                }

                vehicleDescriptionDao.saveOrUpdate(vehicleDescription);
            }
        }
    }

    @Override
    public DeleteResponseDto deleteVehicle(Integer id) {
        try {
            vehicleDao.delete(id);  // TODO: make somehow sure that the item has been deleted.
            return DeleteResponseDto.Factory.success();
        } catch (Exception e) {
            logger.error("deleteVehicle failed. id: " + id, e);
            throw e;
        }
    }

    @Override
    public SearchResponseDto search(SearchRequestDto params) {
        try {
            SearchResponseDto response = new SearchResponseDto();
            List<VehicleSearchDto> searchResultsDto = new ArrayList<>();
            List<Vehicle> vehicles = vehicleDao.search(params);

            vehicles.forEach(vehicle -> searchResultsDto.add(mapper.map(vehicle, VehicleSearchDto.class)));

            response.setSuccess(!searchResultsDto.isEmpty());
            response.setVehicles(searchResultsDto);

            return response;
        } catch (Exception e) {
            logger.error("search failed. params: " + JsonHelper.toJson(params), e);
            throw e;
        }
    }
}
