package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class PerformanceDto {

	private String drivenWheels;
	private Integer doors;
	private Integer compressionRatio;
	private String compressorType;
	private String configuration;
	private String cylinders;
	private String displacement;
	private String fuelType;
	private Integer horsePower;
	private Integer size;
	private Integer torque;
	private Integer totalValves;
	private String powerTrain;
	
}
