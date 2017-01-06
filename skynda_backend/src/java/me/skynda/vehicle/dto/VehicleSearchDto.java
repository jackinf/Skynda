package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.common.dto.BaseDto;

import java.math.BigDecimal;

@Data
public class VehicleSearchDto extends BaseDto {
    private VehicleModelDto model;
    private BigDecimal price;
    private BigDecimal mileage;
    private String comment;
    private ImageDto mainImage;
}
