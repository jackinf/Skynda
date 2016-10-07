package me.skynda.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class PetrolConsumptionDto {
	
	private String city;
	private String highWay;
	private String average;
	
	public void setAverage(String fuelCity, String fuelHigway) {
		Double result = (Double.parseDouble(fuelCity) + Double.parseDouble(fuelHigway)) / 2;
		this.average = result.toString();
	}

}
