package me.skynda.vehicle.service;

import me.skynda.vehicle.controller.VehicleManufacturer;
import me.skynda.vehicle.dto.VehicleManufacturerDto;
import me.skynda.vehicle.dto.request.VehicleManufacturerSearchDto;
import me.skynda.vehicle.dto.response.VehicleManufacturerResponseDto;

import java.util.List;

public interface VehicleManufacturerService {
    /**
     * Gets all data from the database
     * @return all vehicle models
     */
    List<VehicleManufacturerResponseDto> get(VehicleManufacturerSearchDto dto);

    /**
     * Adds new vehicle manufacturer
     * @param vehicleManufacturerDto Added manufacturer's dto
     * @return Added manufacturer's db model
     */
    VehicleManufacturer save(VehicleManufacturerDto vehicleManufacturerDto);
}
