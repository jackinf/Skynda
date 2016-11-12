package me.skynda.vehicle.service;

import me.skynda.vehicle.dao.VehicleManufacturerDao;
import me.skynda.vehicle.dao.VehicleModelsDao;
import me.skynda.vehicle.dto.VehicleModelDto;
import me.skynda.vehicle.dto.request.VehicleModelRequestDto;
import me.skynda.vehicle.dto.response.VehicleModelResponseDto;
import me.skynda.vehicle.entity.VehicleModel;
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
    VehicleManufacturerDao vehicleManufacturerDao;

    @Autowired
    VehicleModelsDao vehicleModelsDao;

    @Override
    public List<VehicleModelResponseDto> get(VehicleModelRequestDto dto) { // TODO: use VehicleModelRequestDto to search
        List<VehicleModelResponseDto> responseDtos = new ArrayList<>();
        vehicleModelsDao.getAll().forEach(c -> {
            VehicleModelResponseDto responseDto = new VehicleModelResponseDto();
            VehicleManufacturer vehicleManufacturer = c.getVehicleManufacturer();
            if (vehicleManufacturer != null) {
                responseDto.setManufacturerCode(vehicleManufacturer.getManufacturerCode());
            }
            responseDto.setModelCode(c.getModelCode());
            responseDto.setTitle(c.getTitle());
            responseDtos.add(responseDto);
        });
        return responseDtos;
    }

    @Override
    public VehicleModel save(VehicleModelDto vehicleModelDto) {
        VehicleModel vehicleModel;
        Mapper mapper = new DozerBeanMapper();
        vehicleModel = mapper.map(vehicleModelDto, VehicleModel.class);
        VehicleManufacturer cm = vehicleManufacturerDao.getByManufacturerCode(vehicleModelDto.getVehicleManufacturerCode());
        vehicleModel.setVehicleManufacturer(cm);
        return vehicleModelsDao.saveOrUpdate(vehicleModel);
    }
}
