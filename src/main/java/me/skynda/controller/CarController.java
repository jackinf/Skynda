package me.skynda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import me.skynda.dto.SingleCarDataDto;
import me.skynda.service.CarService;

@RestController
@RequestMapping("/api")
public class CarController {
	
	@Autowired
	private CarService carService;
	
    @RequestMapping(value = "/cars", method = RequestMethod.GET, produces = "application/json")
    public List<SingleCarDataDto> getCars() {
        return carService.getCars();
    }
    
	@RequestMapping(value = "/car", method = RequestMethod.POST, consumes = "application/json")
    public List<SingleCarDataDto> insertCars() {
        return carService.getCars();
    }

}
