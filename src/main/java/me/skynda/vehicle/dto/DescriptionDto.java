package me.skynda.vehicle.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class DescriptionDto {
	
	private String title;
	private String text;
	
}
