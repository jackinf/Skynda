package me.skynda.classification.controller;

import me.skynda.classification.dto.ClassificationRequestDto;
import me.skynda.classification.dto.ClassificationResponseDto;
import me.skynda.common.controller.BaseController;
import me.skynda.common.interfaces.services.ClassificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
public class ClassificationController extends BaseController {

    @Autowired
    private ClassificationService classificationService;

    @RequestMapping(value = "/classifiers", method = RequestMethod.GET)
    public List<ClassificationResponseDto> getAll(@RequestBody(required = false) ClassificationRequestDto searchDto) {
        return classificationService.get(searchDto);
    }

}
