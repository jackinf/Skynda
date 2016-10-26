package me.skynda.car.controller;

import me.skynda.car.dto.CarModelDto;
import me.skynda.car.dto.request.CarModelsRequestDto;
import me.skynda.car.dto.response.CarModelResponseDto;
import me.skynda.car.model.CarModels;
import me.skynda.car.service.CarModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
public class CarModelController {

    @Autowired
    private CarModelService carModelService;

    @RequestMapping(value = "/car-models", method = RequestMethod.GET)
    public List<CarModelResponseDto> getAll(@RequestBody(required = false) CarModelsRequestDto searchDto) {
        return carModelService.get(searchDto);
    }

    @RequestMapping(value = "/car-model", method = RequestMethod.POST, consumes =  "application/json")
    public CarModels save(@RequestBody CarModelDto carModelDto) {
        return carModelService.save(carModelDto);
    }

}
