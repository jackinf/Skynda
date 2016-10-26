package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;

@Data
@ToString(callSuper = false)
public class CarGeneralDto {

	private String src;
	private Integer year;
	private String manufacturer;
	private String model;
	private String engine;
	private Integer horsePower;
	private BigDecimal mileage;
	private String transmission;
	private String drive;
	private String colorOutside;
	private String colorInside;
	private Integer doors;
	private String seats;
}
