package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.common.dto.BaseDto;

import java.math.BigDecimal;

@Data
public class VehicleSearchDto extends BaseDto {
    private String vinCode;
    private BigDecimal price;
    private String registrationNumber;
    private BigDecimal mileage;
    private String colorOutside;
    private String colorInside;
    private String fuelCity;
    private String fuelHighway;
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
    private Boolean isSold;

    private ImageDto mainImage;
    private VehicleModelDto model;
}
