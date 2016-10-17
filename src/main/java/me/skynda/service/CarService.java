package me.skynda.service;

import java.util.List;

import me.skynda.dto.SingleCarDataDto;

public interface CarService {

	/**
	 * Gets all data from the database
	 * @return all cars
	 */
	List<SingleCarDataDto> getCars();

	/**
	 * Gets a single car
	 * @param id car's id
	 * @return single car
	 */
	SingleCarDataDto getCar(int id);

}
