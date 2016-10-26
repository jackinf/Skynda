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
	private String carModelsCode;
	private String vinCode;
	private BigDecimal price;
	private String registrationNumber;
	private BigDecimal mileage;
	private String colorOutside;
	private String colorInside;

	private List<ImagesDto> images;
	private Boolean isSold;
	private String fuelCity;
	private String fuelHighway;
	private List<FeatureDto> features;
	private List<FaultsDto> faults;
	private PerformanceDto performance;
	private Integer safetyStars;
}
