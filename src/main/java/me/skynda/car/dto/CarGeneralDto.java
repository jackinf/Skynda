package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class CarGeneralDto {

	private String src;
	private Integer year;
	private String manufacturer;
	private String model;
	private String engine;
	private Integer horsePower;
	private String mileage;
	private String transmission;
	private String drive;
	private String colorOutside;
	private String colorInside;
	private Integer doors;
	private String seats;
}
