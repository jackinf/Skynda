package me.skynda.feature.controller;

import me.skynda.common.controller.BaseController;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.services.IFeatureService;
import me.skynda.feature.dto.FeatureAdminSelectDto;
import me.skynda.feature.dto.FeatureDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
public class FeatureController extends BaseController {

    private final IFeatureService service;

    @Autowired
    public FeatureController(IFeatureService service) {
        this.service = service;
    }

    @RequestMapping(value = "/features", method = RequestMethod.GET)
    public List<FeatureDto> getAll() {
        return service.getAll();
    }

    @RequestMapping(value = "/adminSelectFeatures", method = RequestMethod.GET)
    public List<FeatureAdminSelectDto> getAllForAdminSelect() {
        return service.getAllForAdminSelect();
    }

    @RequestMapping(value = "/feature/{id}", method = RequestMethod.GET)
    public FeatureDto get(@PathVariable("id") Integer id) {
        return service.getSingleBy(id);
    }

    @RequestMapping(value = "/feature", method = RequestMethod.POST)
    public CreateOrUpdateResponseDto add(@RequestBody FeatureDto dto, BindingResult bindingResult) {
        dto.setId(null);
        return service.createOrUpdate(dto, bindingResult);
    }

    @RequestMapping(value = "/feature/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public CreateOrUpdateResponseDto update(@PathVariable("id") Integer id,
                                            @RequestBody FeatureDto dto,
                                            BindingResult bindingResult) {
        dto.setId(id);
        return service.createOrUpdate(dto, bindingResult);
    }

    @RequestMapping(value = "/feature/{id}", method = RequestMethod.DELETE, consumes = "application/json")
    public DeleteResponseDto delete(@PathVariable("id") Integer id) {
        return service.delete(id);
    }

}
