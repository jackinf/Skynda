package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class DescriptionsDto {
	
	private String title;
	private String text;
	
}
