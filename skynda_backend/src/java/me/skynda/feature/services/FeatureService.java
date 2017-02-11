package me.skynda.feature.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.entities.Feature;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.IFeatureDao;
import me.skynda.common.interfaces.services.IFeatureService;
import me.skynda.feature.dto.FeatureDto;
import me.skynda.vehicle.services.VehicleService;
import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FeatureService implements IFeatureService {

    private final Mapper mapper;
    private static Logger logger = LoggerFactory.getLogger(VehicleService.class);
    private final IFeatureDao dao;

    public FeatureService(Mapper mapper,IFeatureDao dao) {
        this.mapper = mapper;
        this.dao = dao;
    }

    @Override
    public List<FeatureDto> getAll() {
        try {

            List<FeatureDto> features = dao.getAll()
                    .stream()
                    .map(entity -> mapper.map(entity, FeatureDto.class))
                    .collect(Collectors.toList());
            return features;

        } catch (Exception e) {
            logger.error("getAll failed.", e);
            throw e;
        }
    }

    @Override
    public FeatureDto getSingleBy(Integer id) {
        try {
            Feature vehicleReport = dao.get(id);
            return mapper.map(vehicleReport, FeatureDto.class);
        } catch (Exception e) {
            logger.error("getSingleBy failed. id: " + id, e);
            throw e;
        }
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdate(FeatureDto dto, BindingResult bindingResult) {
        try {
            Feature vehicleReport = mapper.map(dto, Feature.class);

            if (dto.getId() != null) {
                vehicleReport = dao.get(dto.getId());
                mapper.map(dto, vehicleReport);
            }

            Feature persistedFeature = dao.saveOrUpdate(vehicleReport);

            CreateOrUpdateResponseDto response = CreateOrUpdateResponseDto.Factory.success(persistedFeature.getId(), true);
            response.setIsModal(dto.getIsModal());

            return response;
        } catch (Exception e) {
            logger.error("createOrUpdate failed. dto: " + JsonHelper.toJson(dto), e);
            throw e;
        }
    }

    @Override
    public DeleteResponseDto delete(Integer id) {
        try {
            DeleteResponseDto response = new DeleteResponseDto();
            Feature feature =  dao.get(id);
            dao.deleteEntity(feature, response);
            return response;
        } catch (Exception e) {
            logger.error("delete failed. id: " + id, e);
            throw e;
        }
    }

    @Override
    public List<FeatureDto> getAllBy(Serializable vehicleId){
        try {
//            List<Feature> vehicleReportList = dao.getAllBy(vehicleId);
//            return vehicleReportList.stream().map(entity -> mapper.map(entity, VehicleReportDto.class))
//                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("getAllBy failed. vehicleId: " + vehicleId, e);
            throw e;
        }
        return null;
    }

}
