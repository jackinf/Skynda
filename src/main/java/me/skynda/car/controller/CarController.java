package me.skynda.car.controller;

import java.util.List;

import me.skynda.car.dto.request.CarSearchRequestDto;
import me.skynda.common.dto.CreateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.UpdateResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import me.skynda.car.dto.CarDto;
import me.skynda.car.dto.SingleCarDataDto;
import me.skynda.car.model.Car;
import me.skynda.car.service.CarService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
public class CarController extends BaseController {
	
	@Autowired
	private CarService carService;
	
    @RequestMapping(value = "/cars", method = RequestMethod.GET)
    public List<SingleCarDataDto> getAll(@RequestBody(required = false) CarSearchRequestDto dto) {
        return carService.getCars();
    }

    @RequestMapping(value = "/car/{id}", method = RequestMethod.GET)
    public SingleCarDataDto get(@PathVariable("id") Long id) {
        return carService.getCar(id);
    }

	@RequestMapping(value = "/car", method = RequestMethod.POST, consumes = "application/json")
    public CreateResponseDto add(@RequestBody CarDto carDto, BindingResult bindingResult) {
        return carService.saveCarForSale(carDto, bindingResult);
    }

	@RequestMapping(value = "/car/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public UpdateResponseDto update(@PathVariable("id") Long id,
                                    @RequestBody CarDto carDto,
                                    BindingResult bindingResult) {
        carDto.setId(id);
        return carService.updateCarForSale(carDto, bindingResult);
    }
	
	@RequestMapping(value = "/car/{id}", method = RequestMethod.DELETE, consumes = "application/json")
    public DeleteResponseDto delete(@PathVariable("id") Long id) {
        return carService.deleteCar(id);
    }

}
