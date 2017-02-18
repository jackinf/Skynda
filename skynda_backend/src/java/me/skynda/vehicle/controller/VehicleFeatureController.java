package me.skynda.vehicle.controller;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.services.IVehicleFeatureService;
import me.skynda.vehicle.dto.VehicleFeatureDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api")
public class VehicleFeatureController {

    private final IVehicleFeatureService service;

    @Autowired
    public VehicleFeatureController(IVehicleFeatureService service) {
        this.service = service;
    }

    @RequestMapping(value = "/vehicle-features/{id}", method = RequestMethod.GET, consumes = "application/json")
    public List<VehicleFeatureDto> getAllByVehicle(@PathVariable("id") Integer id) {
        return service.getAllBy(id);
    }

}
