package me.skynda.vehicle.controller;

import me.skynda.vehicle.dto.VehicleModelDto;
import me.skynda.vehicle.dto.request.ModelRequestDto;
import me.skynda.vehicle.dto.response.VehicleModelResponseDto;
import me.skynda.vehicle.entities.VehicleModel;
import me.skynda.common.interfaces.services.VehicleModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
public class VehicleModelController {

    @Autowired
    private VehicleModelService vehicleModelService;

    @RequestMapping(value = "/vehicle-models", method = RequestMethod.GET)
    public List<VehicleModelResponseDto> getAll(@RequestBody(required = false) ModelRequestDto searchDto) {
        return vehicleModelService.get(searchDto);
    }

    @RequestMapping(value = "/vehicle-model", method = RequestMethod.POST, consumes =  "application/json")
    public VehicleModel save(@RequestBody VehicleModelDto vehicleModelDto) {
        return vehicleModelService.save(vehicleModelDto);
    }

}
