package me.skynda.vehicle.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;
import lombok.ToString;
import me.skynda.classification.dto.ClassificationDto;
import me.skynda.common.helper.StringHelper;

@Data
@ToString(callSuper = false)
public class VehicleDetailedDto {

	private Integer id;
	private String vinCode;
	private BigDecimal price;
	private String registrationNumber;
	private BigDecimal mileage;
	private ClassificationDto colorOutside;
	private ClassificationDto colorInside;
	private String fuelCity;
	private String fuelHighway;
	private String fuelAverage;
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

	private List<FeatureDto> features;
	private List<FaultBaseDto> faults;
	private List<CategoriesDto> reportsCategories;
	private List<VehicleReportItemDto> reportItems;

	private List<ImageContainerDto> images;
	private List<DescriptionDto> descriptions;
	private List<ReviewDto> reviews;

	private String average;

	public void setAverage(String fuelCity, String fuelHigway) {
		if (StringHelper.empty(fuelCity) || StringHelper.empty(fuelHigway)) {
			this.fuelAverage = null;
		} else {
			try {
				double result = (Double.parseDouble(fuelCity) + Double.parseDouble(fuelHigway)) / 2;
				this.fuelAverage = String.valueOf(result);
			} catch (NumberFormatException e) {
				this.fuelAverage = "0";
			}
		}
	}


}
