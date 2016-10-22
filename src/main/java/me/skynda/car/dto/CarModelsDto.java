package me.skynda.car.dto;


import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class CarModelsDto {

	private String modelCode;// PK
	private String carManufacturerCode;
	private String description;
	private String title;
	private String transmission;
	private String engine;
	private String horsePower;
	private String drive;
	private String doors;
	private String seats;
	private String year;
	private String bodyType;
}
