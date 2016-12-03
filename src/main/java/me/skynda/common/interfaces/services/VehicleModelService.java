package me.skynda.common.interfaces.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.VehicleModelAdminDto;
import me.skynda.vehicle.dto.VehicleModelDto;
import me.skynda.vehicle.dto.request.ModelRequestDto;
import me.skynda.vehicle.dto.response.VehicleModelResponseDto;
import me.skynda.vehicle.entities.VehicleModel;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface VehicleModelService {
    /**
     * Gets all data from the database
     * @return all vehicle models
     */
    List<VehicleModelResponseDto> getAll(ModelRequestDto dto);

    VehicleModelAdminDto get(Integer id);

    /**
     * Adds new vehicle model
     * E.g. BMW
     * @param vehicleModelDto Added vehicle model's dto
     * @return Added vehicle model's db model
     */
    VehicleModel save(VehicleModelDto vehicleModelDto);

    CreateOrUpdateResponseDto createOrUpdate(VehicleModelAdminDto vehicleModelAdminDto, BindingResult bindingResult);

    DeleteResponseDto delete(Integer id);

}
