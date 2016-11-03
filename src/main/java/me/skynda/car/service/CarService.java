package me.skynda.car.service;

import java.lang.reflect.Array;
import java.util.List;

import me.skynda.car.dto.CarDto;
import me.skynda.car.dto.SingleCarDataDto;
import me.skynda.car.dto.request.CarSearchRequestDto;
import me.skynda.car.dto.request.CarSearchRequestDto;
import me.skynda.car.model.CarManufacturer;
import me.skynda.common.dto.CreateResponseDto;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.SearchResponseDto;
import me.skynda.common.dto.SearchResponseDto;
import me.skynda.common.dto.UpdateResponseDto;
import org.springframework.validation.BindingResult;

public interface CarService {

	/**
	 * Gets all data from the database
	 * @return all cars
	 */
	List<SingleCarDataDto> getCars();

	/**
	 * Adds new car for sale
	 * @param carDto Added car's dto
	 * @return Response
	 */
	CreateOrUpdateResponseDto createOrUpdateCarForSale(CarDto carDto, BindingResult bindingResult);

	/**
	 * Gets a single car. Used for udpating a car.
	 * @param id car's id
	 * @return single car's dto
	 */
	CarDto getCar(Long id);
	/**
	 * Gets a single car. Used for displaying full info about the car to the user
	 * @param id car's id
	 * @return single car's dto
	 */
	SingleCarDataDto getCarDetailed(Long id);
	
	/**
	 * Delets a single car
	 * @param id car's id
	 * @return Is the deletion successful or not
	 */
	DeleteResponseDto deleteCar(Long id);

	/**
	 * Search cars. Used for displaying full info about the car to the user
	 * @params search params
	 * @return search results
	 */
	SearchResponseDto search(CarSearchRequestDto params);

}
