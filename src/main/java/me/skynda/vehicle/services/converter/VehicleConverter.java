package me.skynda.vehicle.services.converter;

import me.skynda.vehicle.dto.*;
import me.skynda.vehicle.entities.*;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class VehicleConverter {

    @Autowired
    private Mapper mapper;


    public VehicleDetailedDto transformToVehicle(Vehicle vehicle) {

        VehicleDetailedDto detailedDto = mapper.map(vehicle, VehicleDetailedDto.class);
        return detailedDto;
    }

    public Vehicle transformToVehicle(VehicleAdminDto adminDto) {

        Vehicle vehicle = mapper.map(adminDto, Vehicle.class);
        return vehicle;
    }

    public VehicleAdminDto transformToAdminDto(Vehicle vehicle) {

        VehicleAdminDto adminDto = mapper.map(vehicle, VehicleAdminDto.class);
        return adminDto;
    }

    public VehicleSearchDto transformToSearchDto(Vehicle entity) {

        VehicleSearchDto vehicleDto = mapper.map(entity, VehicleSearchDto.class);
        return vehicleDto;
    }

}
