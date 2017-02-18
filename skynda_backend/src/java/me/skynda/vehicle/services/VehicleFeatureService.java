package me.skynda.vehicle.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.entities.VehicleFeature;
import me.skynda.common.entities.VehicleReview;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.IVehicleFeatureDao;
import me.skynda.common.interfaces.daos.IVehicleReviewDao;
import me.skynda.common.interfaces.services.IBlobStorageService;
import me.skynda.common.interfaces.services.IVehicleFeatureService;
import me.skynda.common.interfaces.services.IVehicleReviewService;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.dto.VehicleFeatureDto;
import me.skynda.vehicle.dto.VehicleReviewAdminDto;
import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class VehicleFeatureService implements IVehicleFeatureService {

    private final IVehicleFeatureDao vehicleFeatureDao;
    private final Mapper mapper;

    private static Logger logger = LoggerFactory.getLogger(VehicleService.class);

    @Autowired
    public VehicleFeatureService(
            IVehicleFeatureDao vehicleFeatureDao,
            Mapper mapper) {
        this.vehicleFeatureDao = vehicleFeatureDao;
        this.mapper = mapper;
    }

    @Override
    public List<VehicleFeatureDto> getAllBy(Serializable vehicleId){
        try {
            List<VehicleFeature> vehicleFeatureList = vehicleFeatureDao.getAllBy(vehicleId);
            return vehicleFeatureList.stream().map(entity -> mapper.map(entity, VehicleFeatureDto.class))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("getAllBy failed. vehicleId: " + vehicleId, e);
            throw e;
        }
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdate(VehicleFeatureDto dto, BindingResult bindingResult) {
        try {

//            VehicleReview persistedVehicleReview = vehicleFeatureDao.saveOrUpdate(null);
//            CreateOrUpdateResponseDto response = CreateOrUpdateResponseDto.Factory.success(persistedVehicleReview.getId(), true);
//            response.setVehicleId(persistedVehicleReview.getVehicleId());

            return null;
        } catch (Exception e) {
            logger.error("createOrUpdate failed. dto: " + JsonHelper.toJson(dto), e);
            throw e;
        }
    }

    @Override
    public DeleteResponseDto delete(Integer id, Integer vehicleId) {
        try {
            DeleteResponseDto response = new DeleteResponseDto();
//            Feature feature =  dao.get(id);
//            dao.deleteEntity(feature, response);
            return response;
        } catch (Exception e) {
            logger.error("delete failed. id: " + id, e);
            throw e;
        }
    }
}
