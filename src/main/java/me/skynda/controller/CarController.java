package me.skynda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import me.skynda.dto.SingleCarDataDto;
import me.skynda.service.CarService;

import javax.ws.rs.Path;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CarController {
	
	@Autowired
	private CarService carService;
	
    @RequestMapping(value = "/cars", method = RequestMethod.GET, produces = "application/json")
    public List<SingleCarDataDto> getCars() {
        return carService.getCars();
    }

    @RequestMapping(value = "/car/{id}", method = RequestMethod.GET, produces = "application/json")
    public SingleCarDataDto getCar(@PathVariable("id") Integer id) {
        return carService.getCar(id);
    }
    
	@RequestMapping(value = "/car", method = RequestMethod.POST, consumes = "application/json")
    public List<SingleCarDataDto> insertCars() {
        return carService.getCars();
    }

}
