package me.skynda.common.controller;

import me.skynda.common.dto.request.ClassifierRequestDto;
import me.skynda.common.dto.response.ClassifierResponseDto;
import me.skynda.common.service.ClassificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
public class ClassifierController {

    @Autowired
    private ClassificationService classificationService;

    @RequestMapping(value = "/classifiers", method = RequestMethod.GET)
    public List<ClassifierResponseDto> getAll(@RequestBody(required = false) ClassifierRequestDto searchDto) {
        return classificationService.get(searchDto);
    }

}
