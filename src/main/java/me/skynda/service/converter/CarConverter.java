package me.skynda.service.converter;

import me.skynda.dto.CarGeneralDto;
import me.skynda.dto.SingleCarDataDto;
import me.skynda.model.Car;

public class CarConverter {
	
	public SingleCarDataDto transform(Car car) {
		SingleCarDataDto singleCarDataDto = new SingleCarDataDto();
		CarGeneralDto carGeneralDto = new CarGeneralDto();
		carGeneralDto.setColorInside(car.getColorInside());
		

		return null;
	}

}
