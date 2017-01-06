package me.skynda.vehicle.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class PointsDto {
	
	private String text;
	private Boolean isPass;

}
