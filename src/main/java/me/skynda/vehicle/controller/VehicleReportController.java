package me.skynda.vehicle.controller;

import me.skynda.common.controller.BaseController;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.VehicleReportAdminDto;
import me.skynda.common.interfaces.services.VehicleReportService;
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
public class VehicleReportController extends BaseController {

    @Autowired
    private VehicleReportService service;

    @RequestMapping(value = "/vehicle-reports", method = RequestMethod.GET)
    public List<VehicleReportAdminDto> getAll() {
        return service.getAll();
    }

    @RequestMapping(value = "/vehicle-report/{id}", method = RequestMethod.GET)
    public VehicleReportAdminDto get(@PathVariable("id") Long id) {
        return service.getSingleBy(id);
    }

    @RequestMapping(value = "/vehicle-report", method = RequestMethod.POST)
    public CreateOrUpdateResponseDto add(@RequestBody VehicleReportAdminDto dto, BindingResult bindingResult) {
        dto.setId(null);
        return service.createOrUpdate(dto, bindingResult);
    }

    @RequestMapping(value = "/vehicle-report/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public CreateOrUpdateResponseDto update(@PathVariable("id") Long id,
                                            @RequestBody VehicleReportAdminDto dto,
                                            BindingResult bindingResult) {
        dto.setId(id);
        return service.createOrUpdate(dto, bindingResult);
    }

    @RequestMapping(value = "/vehicle-report/{id}", method = RequestMethod.DELETE, consumes = "application/json")
    public DeleteResponseDto delete(@PathVariable("id") Long id) {
        return service.delete(id);
    }
}
