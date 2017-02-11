package me.skynda.common.interfaces.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.VehicleReportDto;
import org.springframework.validation.BindingResult;

import java.io.Serializable;
import java.util.List;

public interface IVehicleReportService {
    List<VehicleReportDto> getAll();

    VehicleReportDto getSingleBy(Integer id);

    CreateOrUpdateResponseDto createOrUpdate(VehicleReportDto dto, BindingResult bindingResult);

    DeleteResponseDto delete(Integer id);
    List<VehicleReportDto> getAllBy(Serializable vehicleId);
}
