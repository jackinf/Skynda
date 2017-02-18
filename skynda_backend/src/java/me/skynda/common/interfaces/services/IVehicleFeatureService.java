package me.skynda.common.interfaces.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.feature.dto.FeatureDto;
import me.skynda.vehicle.dto.VehicleFeatureDto;
import me.skynda.vehicle.dto.VehicleReviewAdminDto;
import org.springframework.validation.BindingResult;

import java.io.Serializable;
import java.util.List;


public interface IVehicleFeatureService {
    CreateOrUpdateResponseDto createOrUpdate(VehicleFeatureDto dto, BindingResult bindingResult);
    List<VehicleFeatureDto> getAllBy(Serializable vehicleId);
    DeleteResponseDto delete(Integer id, Integer vehicleId);
}
