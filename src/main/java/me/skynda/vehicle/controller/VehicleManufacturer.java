package me.skynda.vehicle.controller;

import me.skynda.vehicle.dto.VehicleManufacturerDto;
import me.skynda.vehicle.dto.request.VehicleManufacturerSearchDto;
import me.skynda.vehicle.dto.response.VehicleManufacturerResponseDto;
import me.skynda.vehicle.service.VehicleManufacturerService;
import me.skynda.common.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
public class VehicleManufacturer extends BaseController {

    @Autowired
    private VehicleManufacturerService vehicleManufacturerService;

    @RequestMapping(value = "/vehicle-manufacturers", method = RequestMethod.GET)
    public List<VehicleManufacturerResponseDto> getAll(@RequestBody(required = false) VehicleManufacturerSearchDto searchDto) {
        return vehicleManufacturerService.get(searchDto);
    }

    @RequestMapping(value = "/vehicle-manufacturer", method = RequestMethod.POST, consumes =  "application/json")
    public VehicleManufacturer save(@RequestBody VehicleManufacturerDto vehicleManufacturerDto) {
        return vehicleManufacturerService.save(vehicleManufacturerDto);
    }

}
