package me.skynda.feature.dto;

import lombok.Data;
import me.skynda.common.dto.BaseDto;

@Data
public class FeatureAdminSelectDto extends BaseDto {
    private String label;
    private Integer value;
}
