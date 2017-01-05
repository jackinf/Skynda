package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.classification.dto.ClassificationDto;
import me.skynda.common.dto.BaseDto;

/**
 * Created by jevgenir on 12/3/2016.
 */
@Data
public class VehicleModelAdminDto extends BaseDto {

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
