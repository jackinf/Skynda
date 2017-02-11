package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.classification.dto.ClassificationDto;

@Data
public class VehicleFeatureDto {
    private Integer id;
    private ClassificationDto feature;
}
