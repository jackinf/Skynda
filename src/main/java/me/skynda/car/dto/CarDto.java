package me.skynda.car.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import lombok.Data;
import lombok.ToString;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class CarDto extends BaseDto {
	private String carModelsCode;		// TODO: Foreign key
    private String carManufacturerCode;	// TODO: Foreign key
	private String vinCode;
	private BigDecimal price;
	private String registrationNumber;
	private Integer mileage;
	private String colorOutside;
	private String colorInside;

	private List<ImagesDto> images;		// TODO: we need table car_image
	private Boolean isSold;
	private String fuelCity;
	private String fuelHighway;
	private List<FeatureDto> features;	// TODO: we need table car_feature
	private List<FaultsDto> faults;		// TODO: we need table car_fault
	private PerformanceDto performance;
	private Integer safetyStars;

	@Data
	public class FeatureDto {
		private Integer id;
		private String text;
	}
}
