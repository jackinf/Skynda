package me.skynda.service;

import java.util.List;

import me.skynda.dto.CarDto;
import me.skynda.dto.CarManufacturerDto;
import me.skynda.dto.CarModelsDto;
import me.skynda.dto.SingleCarDataDto;
import me.skynda.model.Car;
import me.skynda.model.CarManufacturer;
import me.skynda.model.CarModels;

public interface CarService {

	/**
	 * Gets all data from the database
	 * @return all cars
	 */
	List<SingleCarDataDto> getCars();

	/**
	 * Adds new or updates an existing car manufacturer
	 * @param carManufacturerDto Added manufacturer's dto
	 * @return Added manufacturer's db model
	 */
	CarManufacturer saveCarManufacturer(CarManufacturerDto carManufacturerDto);

	/**
	 * Adds new or updates an existing car model
	 * E.g. BMW
	 * @param carModelsDto Added car model's dto
	 * @return Added car model's db model
	 */
	CarModels saveCarModel(CarModelsDto carModelsDto);

	/**
	 * Adds new or updates an existing car for sale
	 * @param carDto Added car's dto
	 * @return Added car's db model
	 */
	Car saveCarForSale(CarDto carDto);

	/**
	 * Gets a single car
	 * @param id car's id
	 * @return single car's dto
	 */
	SingleCarDataDto getCar(int id);

}
