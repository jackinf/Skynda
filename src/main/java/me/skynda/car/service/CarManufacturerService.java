package me.skynda.car.service;

import me.skynda.car.dto.CarManufacturerDto;
import me.skynda.car.dto.request.CarManufacturersSearchDto;
import me.skynda.car.dto.response.CarManufacturerResponseDto;
import me.skynda.car.model.CarManufacturer;

import java.util.List;

public interface CarManufacturerService {
    /**
     * Gets all data from the database
     * @return all car models
     */
    List<CarManufacturerResponseDto> get(CarManufacturersSearchDto dto);

    /**
     * Adds new car manufacturer
     * @param carManufacturerDto Added manufacturer's dto
     * @return Added manufacturer's db model
     */
    CarManufacturer save(CarManufacturerDto carManufacturerDto);
}
