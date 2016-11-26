package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.classification.dto.ClassificationDto;

@Data
public class FeatureDto {
    private Integer id;
    private ClassificationDto feature;
}
