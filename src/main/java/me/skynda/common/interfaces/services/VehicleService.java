package me.skynda.common.interfaces.services;

import java.util.List;

import me.skynda.vehicle.dto.VehicleDetailedDto;
import me.skynda.vehicle.dto.VehicleAdminDto;
import me.skynda.vehicle.dto.request.SearchRequestDto;
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
    List<VehicleDetailedDto> getVehicles();

    /**
     * Adds new vehicle for sale
     *
     * @param vehicleAdminDto Added vehicle's dto
     * @return Response
     */
    CreateOrUpdateResponseDto createOrUpdateVehicle(VehicleAdminDto vehicleAdminDto, BindingResult bindingResult);

    /**
     * Gets a single vehicle. Used for udpating a vehicle.
     *
     * @param id vehicle's id
     * @return single vehicle's dto
     */
    VehicleAdminDto getVehicle(Long id);

    /**
     * Gets a single vehicle. Used for displaying full info about the vehicle to the user
     *
     * @param id vehicle's id
     * @return single vehicle's dto
     */
    VehicleDetailedDto getVehicleDetailed(Long id);

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
    SearchResponseDto search(SearchRequestDto params);

}
