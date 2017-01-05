package me.skynda.classification.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class SliderAttributesDto extends ClassificationBaseDto {
    public Double Min;
    public Double Max;
}
