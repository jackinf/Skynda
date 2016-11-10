package me.skynda.vehicle.service;

import me.skynda.vehicle.dao.VehicleManufacturerDao;
import me.skynda.vehicle.dto.VehicleManufacturerDto;
import me.skynda.vehicle.dto.request.VehicleManufacturerSearchDto;
import me.skynda.vehicle.dto.response.VehicleManufacturerResponseDto;
import me.skynda.vehicle.model.VehicleManufacturer;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class VehicleManufacturerServiceImpl implements VehicleManufacturerService {

    @Autowired
    VehicleManufacturerDao vehicleManufacturerDao;

    @Override
    public List<VehicleManufacturerResponseDto> get(VehicleManufacturerSearchDto dto) { // TODO: use VehicleManufacturerSearchDto to search
        List<VehicleManufacturerResponseDto> responseDtos = new ArrayList<>();
        vehicleManufacturerDao.getAll().forEach(c -> {
            VehicleManufacturerResponseDto responseDto = new VehicleManufacturerResponseDto();
            responseDto.setManufacturerCode(c.getManufacturerCode());
            responseDto.setTitle(c.getTitle());
            responseDto.setDescription(c.getDescription());
            responseDtos.add(responseDto);
        });
        return responseDtos;
    }

    @Override
    public VehicleManufacturer save(VehicleManufacturerDto vehicleManufacturerDto) {
        VehicleManufacturer vehicleManufacturer;
        Mapper mapper = new DozerBeanMapper();
        vehicleManufacturer = mapper.map(vehicleManufacturerDto, VehicleManufacturer.class);
        return vehicleManufacturerDao.saveOrUpdate(vehicleManufacturer);
    }
}
