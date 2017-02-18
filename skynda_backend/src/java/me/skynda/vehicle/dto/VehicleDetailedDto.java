package me.skynda.vehicle.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class VehicleDetailedDto {

	private Integer id;
	private String vinCode;
	private BigDecimal price;
	private String registrationNumber;
	private BigDecimal mileage;
	private String colorOutsideHex;
	private String colorInsideHex;
	private BigDecimal fuelCity;
	private BigDecimal fuelHighway;
	private double fuelAverage;
	private String problems;
	private Integer compressionRatio;
	private String compressionType;
	private String configuration;
	private String cylinders;
	private String displacement;
	private String size;
	private Integer torque;
	private Integer totalValves;
	private String additional;
	private ImageDto mainImage;
	private VehicleModelDto model;
	private Boolean isSold;
	private Integer safetyStars;
	private String safetyUrl;

	private List<VehicleFeatureDto> features;
	private List<FaultBaseDto> faults;
	private List<CategoriesDto> reportCategories;
	private List<ReviewDto> reviews;
	private String inspector;

	private List<ImageContainerDto> images;
	private List<VehicleDescriptionDto> descriptions;

	public void calculateFuelAverage() {
		try {
			double result = (this.getFuelCity().add(this.getFuelHighway()).doubleValue()) / 2;
			this.fuelAverage = result;
		} catch (NumberFormatException e) {
			this.fuelAverage = 0;
		}

	}


}
