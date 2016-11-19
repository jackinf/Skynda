package me.skynda.common.interfaces.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.VehicleReportAdminDto;
import org.springframework.validation.BindingResult;

import java.util.List;

/**
 * Created by jevgenir on 11/14/2016.
 */
public interface VehicleReportService {
    List<VehicleReportAdminDto> getAll();

    VehicleReportAdminDto getSingleBy(Integer id);

    CreateOrUpdateResponseDto createOrUpdate(VehicleReportAdminDto dto, BindingResult bindingResult);

    DeleteResponseDto delete(Integer id);
}
