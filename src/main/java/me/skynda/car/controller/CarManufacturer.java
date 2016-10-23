package me.skynda.car.controller;

import me.skynda.car.dto.CarManufacturerDto;
import me.skynda.car.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CarManufacturer extends BaseController {

    @Autowired
    private CarService carService;

    @RequestMapping(value = "/carmanufacturer", method = RequestMethod.POST, consumes = "application/json")
    public me.skynda.car.model.CarManufacturer saveCarManufacturer(@RequestBody CarManufacturerDto carManufacturerDto) {
        return carService.saveOrUpdateCarManufacturer(carManufacturerDto);
    }

}
