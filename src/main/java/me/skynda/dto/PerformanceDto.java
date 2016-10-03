package me.skynda.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class PerformanceDto {

	private String drivenWheels;
	private String doors;
	private String compressionRatio;
	private String compressorType;
	private String configuration;
	private String cylinders;
	private String displacement;
	private String fuelType;
	private String horsePower;
	private String size;
	private String torque;
	private String totalValves;
	private String powerTrain;
	
}
