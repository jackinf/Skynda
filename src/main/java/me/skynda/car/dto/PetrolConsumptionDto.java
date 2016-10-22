package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class PetrolConsumptionDto {
	
	private String city;
	private String highWay;
	private String average;
	
	public void setAverage(String fuelCity, String fuelHigway) {
		if (fuelCity == null || fuelHigway == null) {
			this.average = null;
		} else {
			double result = (Double.parseDouble(fuelCity) + Double.parseDouble(fuelHigway)) / 2;
			this.average = String.valueOf(result);
		}
	}

}
