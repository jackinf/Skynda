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
	
	List<SingleCarDataDto> getCars();
	CarManufacturer saveCarManufacturer(CarManufacturerDto carManufacturerDto);
	CarModels saveCarModel(CarModelsDto carModelsDto);
	Car saveCarForSale(CarDto carDto);

}
