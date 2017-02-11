package me.skynda.feature.controller;

import me.skynda.common.controller.BaseController;
import me.skynda.common.interfaces.services.IFeatureService;
import me.skynda.feature.dto.FeatureDto;
import org.springframework.beans.factory.annotation.Autowired;
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

}
