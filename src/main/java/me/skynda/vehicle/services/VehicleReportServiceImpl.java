package me.skynda.vehicle.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.daos.VehicleReportDao;
import me.skynda.common.interfaces.services.VehicleReportService;
import me.skynda.vehicle.dto.VehicleReportAdminDto;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by jevgenir on 11/14/2016.
 */
public class VehicleReportServiceImpl implements VehicleReportService {

    @Autowired
    VehicleReportDao vehicleReportDao;

    @Autowired
    private Mapper mapper;

    @Override
    public List<VehicleReportAdminDto> getAll() {
        return vehicleReportDao
                .getAll()
                .stream()
                .map(entity -> mapper.map(entity, VehicleReportAdminDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public VehicleReportAdminDto getSingleBy(Long id) {
        return null;
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdate(VehicleReportAdminDto dto, BindingResult bindingResult) {
        return null;
    }

    @Override
    public DeleteResponseDto delete(Long id) {
        vehicleReportDao.delete(id);  // TODO: make somehow sure that the item has been deleted.

        DeleteResponseDto response = new DeleteResponseDto();
        response.setSuccess(true);
        return response;
    }
}
