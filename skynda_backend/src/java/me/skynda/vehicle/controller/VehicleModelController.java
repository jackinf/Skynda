package me.skynda.vehicle.controller;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.services.IVehicleModelService;
import me.skynda.vehicle.dto.VehicleModelAdminDto;
import me.skynda.vehicle.dto.request.ModelRequestDto;
import me.skynda.vehicle.dto.response.VehicleModelResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
public class VehicleModelController {

    private final IVehicleModelService vehicleModelService;

    @Autowired
    public VehicleModelController(IVehicleModelService vehicleModelService) {
        this.vehicleModelService = vehicleModelService;
    }

    @RequestMapping(value = "/vehicle-models", method = RequestMethod.GET)
    public List<VehicleModelResponseDto> getAll(@RequestBody(required = false) ModelRequestDto searchDto) {
        return vehicleModelService.getAll(searchDto);
    }

    @RequestMapping(value = "/vehicle-model/{id}", method = RequestMethod.GET)
    public VehicleModelAdminDto get(@PathVariable("id") Integer id) {
        return vehicleModelService.get(id);
    }

    @RequestMapping(value = "/vehicle-model", method = RequestMethod.POST)
    public CreateOrUpdateResponseDto add(@RequestBody VehicleModelAdminDto vehicleModelAdminDto, BindingResult bindingResult) {
        vehicleModelAdminDto.setId(null);
        return vehicleModelService.createOrUpdate(vehicleModelAdminDto, bindingResult);
    }

    @RequestMapping(value = "/vehicle-model/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public CreateOrUpdateResponseDto update(@PathVariable("id") Integer id,
                                            @RequestBody VehicleModelAdminDto vehicleModelAdminDto,
                                            BindingResult bindingResult) {
        vehicleModelAdminDto.setId(id);
        return vehicleModelService.createOrUpdate(vehicleModelAdminDto, bindingResult);
    }

    @RequestMapping(value = "/vehicle-model/{id}", method = RequestMethod.DELETE, consumes = "application/json")
    public DeleteResponseDto delete(@PathVariable("id") Integer id) {
        return vehicleModelService.delete(id);
    }

}
