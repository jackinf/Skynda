package me.skynda.vehicle.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class OverviewDto {
	
	private String label;
	private String iconUrl;

}
