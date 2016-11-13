package me.skynda.vehicle.controller;

import java.util.List;

import me.skynda.vehicle.dto.request.VehicleSearchRequestDto;
import me.skynda.common.controller.BaseController;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.SearchResponseDto;
import me.skynda.vehicle.dto.VehicleDto;
import me.skynda.vehicle.dto.VehicleDisplayDto;
import me.skynda.vehicle.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api")
public class VehicleController extends BaseController {

    @Autowired
    private VehicleService vehicleService;

    @RequestMapping(value = "/vehicles", method = RequestMethod.GET)
    public List<VehicleDisplayDto> getAll(@RequestBody(required = false) VehicleSearchRequestDto dto) {
        return vehicleService.getVehicles();
    }

    @RequestMapping(value = "/vehicle/{id}", method = RequestMethod.GET)
    public VehicleDto get(@PathVariable("id") Long id) {
        return vehicleService.getVehicle(id);
    }

    @RequestMapping(value = "/vehicle/{id}/detailed", method = RequestMethod.GET, produces = "application/json")
    public VehicleDisplayDto getDetailed(@PathVariable("id") Long id) {
        return vehicleService.getVehicleDetailed(id);
    }

	@RequestMapping(value = "/vehicle1", method = RequestMethod.POST)
    public CreateOrUpdateResponseDto add(@RequestBody VehicleDto vehicleDto, BindingResult bindingResult) {
        vehicleDto.setId(null);
        return vehicleService.createOrUpdateVehicle(vehicleDto, bindingResult);
    }

	@RequestMapping(value = "/vehicle", method = RequestMethod.POST)
    public CreateOrUpdateResponseDto add1(String test) {
        return null;
    }

    @RequestMapping(value = "/vehicle/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public CreateOrUpdateResponseDto update(@PathVariable("id") Long id,
                                            @RequestBody VehicleDto vehicleDto,
                                            BindingResult bindingResult) {
        vehicleDto.setId(id);
        return vehicleService.createOrUpdateVehicle(vehicleDto, bindingResult);
    }

    @RequestMapping(value = "/vehicle/{id}", method = RequestMethod.DELETE, consumes = "application/json")
    public DeleteResponseDto delete(@PathVariable("id") Long id) {
        return vehicleService.deleteVehicle(id);
    }

    @RequestMapping(value = "/vehicle/search", method = RequestMethod.POST, consumes = "application/json")
    public SearchResponseDto search(@RequestBody VehicleSearchRequestDto searchParams){
        return vehicleService.search(searchParams);
    }
}
