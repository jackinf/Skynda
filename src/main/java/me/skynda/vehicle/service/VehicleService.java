package me.skynda.vehicle.service;

import java.util.List;

import me.skynda.vehicle.dto.VehicleDisplayDto;
import me.skynda.vehicle.dto.VehicleDto;
import me.skynda.vehicle.dto.request.VehicleSearchRequestDto;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.SearchResponseDto;
import org.springframework.validation.BindingResult;

public interface VehicleService {

    /**
     * Gets all data from the database
     *
     * @return all vehicles
     */
    List<VehicleDisplayDto> getVehicles();

    /**
     * Adds new vehicle for sale
     *
     * @param vehicleDto Added vehicle's dto
     * @return Response
     */
    CreateOrUpdateResponseDto createOrUpdateVehicle(VehicleDto vehicleDto, BindingResult bindingResult);

    /**
     * Gets a single vehicle. Used for udpating a vehicle.
     *
     * @param id vehicle's id
     * @return single vehicle's dto
     */
    VehicleDto getVehicle(Long id);

    /**
     * Gets a single vehicle. Used for displaying full info about the vehicle to the user
     *
     * @param id vehicle's id
     * @return single vehicle's dto
     */
    VehicleDisplayDto getVehicleDetailed(Long id);

    /**
     * Delets a single vehicle
     *
     * @param id vehicle's id
     * @return Is the deletion successful or not
     */
    DeleteResponseDto deleteVehicle(Long id);

    /**
     * Search vehicles. Used for displaying full info about the vehicle to the user
     *
     * @return search results
     * @params search params
     */
    SearchResponseDto search(VehicleSearchRequestDto params);

}
