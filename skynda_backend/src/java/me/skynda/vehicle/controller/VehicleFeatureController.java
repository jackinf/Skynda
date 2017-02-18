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

    @RequestMapping(value = "/vehicle-feature", method = RequestMethod.POST)
    public CreateOrUpdateResponseDto add(@RequestBody VehicleFeatureDto dto, BindingResult bindingResult) {
        return service.createOrUpdate(dto, bindingResult);
    }

    @RequestMapping(value = "/vehicle-feature/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public CreateOrUpdateResponseDto update(@PathVariable("id") Integer id,
                                            @RequestBody VehicleFeatureDto dto,
                                            BindingResult bindingResult)
    {
        return service.createOrUpdate(dto, bindingResult);
    }

    @RequestMapping(value = "/vehicle-feature/{id}", method = RequestMethod.DELETE, consumes = "application/json")
    public DeleteResponseDto delete(@PathVariable("id") Integer id, Integer vehicleId) {
        return service.delete(id, vehicleId);
    }

}
