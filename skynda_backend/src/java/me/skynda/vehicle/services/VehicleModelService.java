package me.skynda.vehicle.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.daos.IVehicleModelDao;
import me.skynda.common.interfaces.services.IVehicleModelService;
import me.skynda.vehicle.dto.VehicleModelAdminDto;
import me.skynda.vehicle.dto.request.ModelRequestDto;
import me.skynda.vehicle.dto.response.VehicleModelResponseDto;
import me.skynda.vehicle.entities.VehicleModel;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class VehicleModelService implements IVehicleModelService {

    private final IVehicleModelDao vehicleModelDao;
    private final Mapper mapper;

    @Autowired
    public VehicleModelService(IVehicleModelDao vehicleModelDao, Mapper mapper) {
        this.vehicleModelDao = vehicleModelDao;
        this.mapper = mapper;
    }

    @Override
    public List<VehicleModelResponseDto> getAll(ModelRequestDto dto) { // TODO: use dto to search
        List<VehicleModelResponseDto> responseDtos = new ArrayList<>();
        vehicleModelDao.getAll().forEach(vehicleModelEntity -> {
            VehicleModelResponseDto responseDto = new VehicleModelResponseDto();
            mapper.map(vehicleModelEntity, responseDto);
            responseDtos.add(responseDto);
        });
        return responseDtos;
    }

    @Override
    public VehicleModelAdminDto get(Integer id) {
        return mapper.map(vehicleModelDao.get(id), VehicleModelAdminDto.class);
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdate(VehicleModelAdminDto vehicleModelAdminDto, BindingResult bindingResult) {
        /*
            Create new or load existing
         */
        VehicleModel vehicleModel;
        if (vehicleModelAdminDto.getId() != null) {
            vehicleModel = vehicleModelDao.get(vehicleModelAdminDto.getId());
            vehicleModel.setVehicleManufacturer(null);
            vehicleModel.setTransmission(null);
            vehicleModel.setDrivetrain(null);
            vehicleModel.setVehicleBody(null);
            vehicleModel.setFuelType(null);
            mapper.map(vehicleModelAdminDto, vehicleModel);
        } else {
            vehicleModel = mapper.map(vehicleModelAdminDto, VehicleModel.class);
        }

        /*
            Save and return response
         */
        VehicleModel addedVehicleModel = vehicleModelDao.saveOrUpdate(vehicleModel);
        return CreateOrUpdateResponseDto.Factory.success(addedVehicleModel.getId(), true);
    }

    @Override
    public DeleteResponseDto delete(Integer id) {
        vehicleModelDao.delete(id);
        return DeleteResponseDto.Factory.success();
    }
}
