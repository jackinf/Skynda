package me.skynda.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class CarDto {

	private Long id;
    private String carModelsCode;
	private String vinCode;
	private BigDecimal price;
	private Date created;
	private String registrationNumber;
	private String mileage;
	private String colorOutside;
	private String colorInside;
	private String images;
	private Boolean isSold;
	private String fuelCity;
	private String fuelHighway;
	private String features;
	private String problems;
	private String compressionRatio;
	private String compressionType;
	private String configuration;
	private String cylinders;
	private String displacement;
	private String fuelType;
	private String size;
	private String torque;
	private String totalValves;
	private String powerTrain;
	private String safetyStars;
}
