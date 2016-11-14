package me.skynda.vehicle.controller;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.VehicleReviewAdminDto;
import me.skynda.vehicle.dto.VehicleReportAdminDto;
import me.skynda.vehicle.services.VehicleReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * Created by jevgenir on 11/14/2016.
 */
public class VehicleReviewController {

    @Autowired
    private VehicleReviewService service;

    @RequestMapping(value = "/vehicle-reviews", method = RequestMethod.GET)
    public List<VehicleReviewAdminDto> getAll() {
        return service.getAll();
    }

    @RequestMapping(value = "/vehicle-review/{id}", method = RequestMethod.GET)
    public VehicleReviewAdminDto get(@PathVariable("id") Long id) {
        return service.getSingleBy(id);
    }

    @RequestMapping(value = "/vehicle-review", method = RequestMethod.POST)
    public CreateOrUpdateResponseDto add(@RequestBody VehicleReportAdminDto dto, BindingResult bindingResult) {
        dto.setId(null);
        return service.createOrUpdate(dto, bindingResult);
    }

    @RequestMapping(value = "/vehicle-review/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public CreateOrUpdateResponseDto update(@PathVariable("id") Long id,
                                            @RequestBody VehicleReportAdminDto dto,
                                            BindingResult bindingResult) {
        dto.setId(id);
        return service.createOrUpdate(dto, bindingResult);
    }

    @RequestMapping(value = "/vehicle-review/{id}", method = RequestMethod.DELETE, consumes = "application/json")
    public DeleteResponseDto delete(@PathVariable("id") Long id) {
        return service.delete(id);
    }

}
