package me.skynda.feature.dto;

import lombok.Data;
import me.skynda.common.dto.BaseDto;

import java.util.Date;

@Data
public class FeatureDto extends BaseDto {
    private Integer id;
    private String description;
    private Integer weight;
    private String value;
    private String name;
    private Boolean isActive;
    private Boolean isModal;
    private Boolean isImported;
}
