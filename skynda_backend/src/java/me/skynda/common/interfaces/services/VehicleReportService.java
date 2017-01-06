package me.skynda.common.interfaces.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.VehicleReportCategoryAdminDto;
import org.springframework.validation.BindingResult;

import java.util.List;

/**
 * Created by jevgenir on 11/14/2016.
 */
public interface VehicleReportService {
    List<VehicleReportCategoryAdminDto> getAll();

    VehicleReportCategoryAdminDto getSingleBy(Integer id);

    CreateOrUpdateResponseDto createOrUpdate(VehicleReportCategoryAdminDto dto, BindingResult bindingResult);

    DeleteResponseDto delete(Integer id);
}
