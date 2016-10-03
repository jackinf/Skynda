package me.skynda.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class PetrolConsumptionDto {
	
	private String city;
	private String highWay;
	private String average;

}
