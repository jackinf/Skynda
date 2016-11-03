package me.skynda.car.controller;

import java.util.List;

import me.skynda.car.dto.request.CarSearchRequestDto;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import me.skynda.car.dto.CarDto;
import me.skynda.car.dto.SingleCarDataDto;
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
    public CarDto get(@PathVariable("id") Long id) {
        return carService.getCar(id);
    }

    @RequestMapping(value = "/car/{id}/detailed", method = RequestMethod.GET, produces = "application/json")
    public SingleCarDataDto getDetailed(@PathVariable("id") Long id) {
        return carService.getCarDetailed(id);
    }

	@RequestMapping(value = "/car", method = RequestMethod.POST, consumes = "application/json")
    public CreateOrUpdateResponseDto add(@RequestBody CarDto carDto, BindingResult bindingResult) {
        carDto.setId(null);
        return carService.createOrUpdateCarForSale(carDto, bindingResult);
    }

    @RequestMapping(value = "/car/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public CreateOrUpdateResponseDto update(@PathVariable("id") Long id,
                                            @RequestBody CarDto carDto,
                                            BindingResult bindingResult) {
        carDto.setId(id);
        return carService.createOrUpdateCarForSale(carDto, bindingResult);
    }

    @RequestMapping(value = "/car/{id}", method = RequestMethod.DELETE, consumes = "application/json")
    public DeleteResponseDto delete(@PathVariable("id") Long id) {
        return carService.deleteCar(id);
    }

}
