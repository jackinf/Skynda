package me.skynda.car.controller;

import me.skynda.car.dto.CarModelsDto;
import me.skynda.car.model.CarModels;
import me.skynda.car.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CarModelController {

    @Autowired
    private CarService carService;

    @RequestMapping(value = "/carmodel", method = RequestMethod.POST, consumes = "application/json")
    public CarModels saveCarModel(@RequestBody CarModelsDto carModelsDto) {
        return carService.saveOrUpdateCarModel(carModelsDto);
    }

}
