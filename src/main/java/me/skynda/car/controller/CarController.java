package me.skynda.car.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import me.skynda.car.dto.CarDto;
import me.skynda.car.dto.CarManufacturerDto;
import me.skynda.car.dto.CarModelsDto;
import me.skynda.car.dto.SingleCarDataDto;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarManufacturer;
import me.skynda.car.model.CarModels;
import me.skynda.car.service.CarService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CarController extends BaseController {
	
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

    @RequestMapping(value = "/carmodel", method = RequestMethod.POST, consumes = "application/json")
    public CarModels saveCarModel(@RequestBody CarModelsDto carModelsDto) {
        return carService.saveOrUpdateCarModel(carModelsDto);
    }

	@RequestMapping(value = "/carmanufacturer", method = RequestMethod.POST, consumes = "application/json")
    public CarManufacturer saveCarManufacturer(@RequestBody CarManufacturerDto carManufacturerDto) {
        return carService.saveOrUpdateCarManufacturer(carManufacturerDto);
    }

	@RequestMapping(value = "/car", method = RequestMethod.POST, consumes = "application/json")
    public Car saveCarForSale(@RequestBody CarDto carDto) {
        return carService.saveCarForSale(carDto);
    }
	
	@RequestMapping(value = "/deletecar/{id}", method = RequestMethod.DELETE, consumes = "application/json")
    public ResponseEntity<Car> deleteCar(@PathVariable("id") Integer id) {
        carService.deleteCar(id);
		return new ResponseEntity<Car>(HttpStatus.NO_CONTENT);
    }

}
