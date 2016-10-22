package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class PointsDto {
	
	private String text;
	private Boolean pass;

}
