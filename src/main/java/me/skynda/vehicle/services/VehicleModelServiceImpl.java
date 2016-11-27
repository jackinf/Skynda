package me.skynda.vehicle.services;

import me.skynda.common.interfaces.daos.ClassificationDao;
import me.skynda.common.interfaces.daos.VehicleModelDao;
import me.skynda.common.interfaces.services.VehicleModelService;
import me.skynda.vehicle.dto.VehicleModelDto;
import me.skynda.vehicle.dto.request.ModelRequestDto;
import me.skynda.vehicle.dto.response.VehicleModelResponseDto;
import me.skynda.classification.entities.Classification;
import me.skynda.vehicle.entities.VehicleModel;
import org.apache.commons.lang3.NotImplementedException;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class VehicleModelServiceImpl implements VehicleModelService {

    @Autowired
    ClassificationDao classificationDao;

    @Autowired
    VehicleModelDao vehicleModelDao;

    @Override
    public List<VehicleModelResponseDto> get(ModelRequestDto dto) { // TODO: use dto to search
        List<VehicleModelResponseDto> responseDtos = new ArrayList<>();
        vehicleModelDao.getAll().forEach(vehicleModelEntity -> {
            VehicleModelResponseDto responseDto = new VehicleModelResponseDto();
            responseDto.setId(vehicleModelEntity.getId());
            responseDto.setModelCode(vehicleModelEntity.getModelCode());
            responseDto.setTitle(vehicleModelEntity.getTitle());
            responseDtos.add(responseDto);
        });
        return responseDtos;
    }

    @Override
    public VehicleModel save(VehicleModelDto vehicleModelDto) {
        throw new NotImplementedException("Implementeerida");
    }
}
