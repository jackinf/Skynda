package me.skynda.car.service;

import me.skynda.car.dto.CarModelDto;
import me.skynda.car.dto.request.CarModelsRequestDto;
import me.skynda.car.dto.response.CarModelResponseDto;
import me.skynda.car.model.CarModels;

import java.util.List;

public interface CarModelService {
    /**
     * Gets all data from the database
     * @return all car models
     */
    List<CarModelResponseDto> get(CarModelsRequestDto dto);

    /**
     * Adds new car model
     * E.g. BMW
     * @param carModelDto Added car model's dto
     * @return Added car model's db model
     */
    CarModels save(CarModelDto carModelDto);
}
