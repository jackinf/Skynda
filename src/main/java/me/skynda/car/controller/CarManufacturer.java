package me.skynda.car.controller;

import me.skynda.car.dto.CarManufacturerDto;
import me.skynda.car.dto.request.CarManufacturersSearchDto;
import me.skynda.car.dto.request.CarModelsRequestDto;
import me.skynda.car.dto.response.CarManufacturerResponseDto;
import me.skynda.car.dto.response.CarModelResponseDto;
import me.skynda.car.service.CarManufacturerService;
import me.skynda.car.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
public class CarManufacturer extends BaseController {

    @Autowired
    private CarManufacturerService carManufacturerService;

    @RequestMapping(value = "/car-manufacturer", method = RequestMethod.GET)
    public List<CarManufacturerResponseDto> getAll(@RequestBody(required = false) CarManufacturersSearchDto searchDto) {
        return carManufacturerService.get(searchDto);
    }

    @RequestMapping(value = "/car-manufacturer", method = RequestMethod.POST, consumes =  "application/json")
    public me.skynda.car.model.CarManufacturer save(@RequestBody CarManufacturerDto carManufacturerDto) {
        return carManufacturerService.save(carManufacturerDto);
    }

}
