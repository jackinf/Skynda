package me.skynda.classification.dto;

import lombok.Data;

@Data
public class ButtonAttributesDto extends ClassificationBaseDto {
    public String Name;
    public int Value;
    public boolean IsToggled;
}
