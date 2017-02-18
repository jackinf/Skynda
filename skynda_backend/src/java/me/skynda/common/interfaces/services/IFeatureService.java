package me.skynda.common.interfaces.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.feature.dto.FeatureAdminSelectDto;
import me.skynda.feature.dto.FeatureDto;
import me.skynda.vehicle.dto.VehicleFeatureDto;
import org.springframework.validation.BindingResult;

import java.io.Serializable;
import java.util.List;

public interface IFeatureService {
    List<FeatureDto> getAll();
    List<FeatureAdminSelectDto> getAllForAdminSelect();
    FeatureDto getSingleBy(Integer id);
    CreateOrUpdateResponseDto createOrUpdate(FeatureDto dto, BindingResult bindingResult);
    DeleteResponseDto delete(Integer id);
    List<FeatureDto> getAllBy(Serializable vehicleId);
}
