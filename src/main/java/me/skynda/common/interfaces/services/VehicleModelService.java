package me.skynda.common.interfaces.services;

import me.skynda.vehicle.dto.VehicleModelDto;
import me.skynda.vehicle.dto.request.ModelRequestDto;
import me.skynda.vehicle.dto.response.VehicleModelResponseDto;
import me.skynda.vehicle.entities.VehicleModel;

import java.util.List;

public interface VehicleModelService {
    /**
     * Gets all data from the database
     * @return all vehicle models
     */
    List<VehicleModelResponseDto> get(ModelRequestDto dto);

    /**
     * Adds new vehicle model
     * E.g. BMW
     * @param vehicleModelDto Added vehicle model's dto
     * @return Added vehicle model's db model
     */
    VehicleModel save(VehicleModelDto vehicleModelDto);
}
