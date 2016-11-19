package me.skynda.vehicle.controller;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.VehicleReviewAdminDto;
import me.skynda.vehicle.dto.VehicleReportAdminDto;
import me.skynda.common.interfaces.services.VehicleReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by jevgenir on 11/14/2016.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api")
public class VehicleReviewController {

    @Autowired
    private VehicleReviewService service;

    @RequestMapping(value = "/vehicle-reviews", method = RequestMethod.GET)
    public List<VehicleReviewAdminDto> getAll() {
        return service.getAll();
    }

    @RequestMapping(value = "/vehicle-review/{id}", method = RequestMethod.GET)
    public VehicleReviewAdminDto get(@PathVariable("id") Integer id) {
        return service.getSingleBy(id);
    }

    @RequestMapping(value = "/vehicle-review", method = RequestMethod.POST)
    public CreateOrUpdateResponseDto add(@RequestBody VehicleReviewAdminDto dto, BindingResult bindingResult) {
        dto.setId(null);
        return service.createOrUpdate(dto, bindingResult);
    }

    @RequestMapping(value = "/vehicle-review/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public CreateOrUpdateResponseDto update(@PathVariable("id") Integer id,
                                            @RequestBody VehicleReviewAdminDto dto,
                                            BindingResult bindingResult) {
        dto.setId(id);
        return service.createOrUpdate(dto, bindingResult);
    }

    @RequestMapping(value = "/vehicle-review/{id}", method = RequestMethod.DELETE, consumes = "application/json")
    public DeleteResponseDto delete(@PathVariable("id") Integer id) {
        return service.delete(id);
    }

}
