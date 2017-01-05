package me.skynda.vehicle.dto;


import lombok.Data;
import lombok.ToString;
import me.skynda.common.dto.BaseDto;
import me.skynda.classification.dto.ClassificationDto;

@Data
@ToString(callSuper = false)
public class VehicleModelDto extends BaseDto {
	private String modelCode;
	private String description;
	private String title;
	private String engine;
	private Integer horsePower;
	private Integer doors;
	private Integer seats;
	private Integer year;
	private ClassificationDto vehicleManufacturer;
	private ClassificationDto transmission;
	private ClassificationDto drivetrain;
	private ClassificationDto vehicleBody;
	private ClassificationDto fuelType;

}
