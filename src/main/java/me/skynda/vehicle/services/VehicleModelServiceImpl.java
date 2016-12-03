package me.skynda.vehicle.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.daos.ClassificationDao;
import me.skynda.common.interfaces.daos.VehicleModelDao;
import me.skynda.common.interfaces.services.VehicleModelService;
import me.skynda.vehicle.dto.VehicleModelAdminDto;
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
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class VehicleModelServiceImpl implements VehicleModelService {

    @Autowired
    ClassificationDao classificationDao;

    @Autowired
    VehicleModelDao vehicleModelDao;

    @Autowired
    private Mapper mapper;

    @Override
    public List<VehicleModelResponseDto> getAll(ModelRequestDto dto) { // TODO: use dto to search
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
    public VehicleModelAdminDto get(Integer id) {
        VehicleModel vehicleModel = vehicleModelDao.get(id);
        return mapper.map(vehicleModel, VehicleModelAdminDto.class);
    }

    @Override
    public VehicleModel save(VehicleModelDto vehicleModelDto) {
        throw new NotImplementedException("Implementeerida");
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdate(VehicleModelAdminDto vehicleModelAdminDto, BindingResult bindingResult) {
        /*
            Create new or load existing
         */
        VehicleModel vehicleModel;
        if (vehicleModelAdminDto.getId() != null) {
            vehicleModel = vehicleModelDao.get(vehicleModelAdminDto.getId());
            mapper.map(vehicleModelDao, vehicleModel);
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
