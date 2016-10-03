package me.skynda.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class CarGeneralDto {

	private String src;
	private String year;
	private String manufacturer;
	private String model;
	private String engine;
	private String horsePower;
	private String mileage;
	private String transmission;
	private String drive;
	private String colorOutside;
	private String colorInside;
	private String doors;
	private String seats;
}
