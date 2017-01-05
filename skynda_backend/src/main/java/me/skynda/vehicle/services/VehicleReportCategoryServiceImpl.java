package me.skynda.vehicle.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.daos.VehicleReportDao;
import me.skynda.common.interfaces.services.VehicleReportService;
import me.skynda.vehicle.dto.VehicleReportCategoryAdminDto;
import me.skynda.vehicle.entities.VehicleReportCategory;
import me.skynda.vehicle.entities.VehicleReview;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by jevgenir on 11/14/2016.
 */
@Service
@Transactional
public class VehicleReportCategoryServiceImpl implements VehicleReportService {

    @Autowired
    VehicleReportDao vehicleReportDao;

    @Autowired
    private Mapper mapper;

    @Override
    public List<VehicleReportCategoryAdminDto> getAll() {
        return vehicleReportDao
                .getAll()
                .stream()
                .map(entity -> mapper.map(entity, VehicleReportCategoryAdminDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public VehicleReportCategoryAdminDto getSingleBy(Integer id) {
        VehicleReportCategory vehicleReport = vehicleReportDao.get(id);
        return mapper.map(vehicleReport, VehicleReportCategoryAdminDto.class);
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdate(VehicleReportCategoryAdminDto dto, BindingResult bindingResult) {
        /*
            Create new or load existing
         */
        VehicleReportCategory vehicleReportCategory;
        if (dto.getId() != null) {
            vehicleReportCategory = vehicleReportDao.get(dto.getId());
            mapper.map(dto, vehicleReportCategory);
        } else {
            vehicleReportCategory = mapper.map(dto, VehicleReportCategory.class);
        }

        /*
            Save
         */
        VehicleReportCategory persistedVehicleReportCategory = vehicleReportDao.saveOrUpdate(vehicleReportCategory);

        vehicleReportDao.addMultipleToCategoryItems(persistedVehicleReportCategory, dto.getItems());
        return CreateOrUpdateResponseDto.Factory.success(persistedVehicleReportCategory.getId(), true);
    }

    @Override
    public DeleteResponseDto delete(Integer id) {
        vehicleReportDao.delete(id);  // TODO: make somehow sure that the item has been deleted.

        DeleteResponseDto response = new DeleteResponseDto();
        response.setSuccess(true);
        return response;
    }
}
