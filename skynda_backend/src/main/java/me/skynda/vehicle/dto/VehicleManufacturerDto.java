package me.skynda.vehicle.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class VehicleManufacturerDto {

	private String manufacturerCode;//PK
	private String description;
	private String title;
	
}
