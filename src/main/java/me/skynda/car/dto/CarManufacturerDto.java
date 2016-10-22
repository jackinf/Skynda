package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class CarManufacturerDto {

	private String manufacturerCode;//PK
	private String description;
	private String title;
	
}
