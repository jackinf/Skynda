package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.common.dto.BaseDto;
import me.skynda.feature.dto.FeatureDto;

@Data
public class VehicleFeatureDto extends BaseDto {
    private Integer vehicleId;
    private FeatureDto feature;
}
