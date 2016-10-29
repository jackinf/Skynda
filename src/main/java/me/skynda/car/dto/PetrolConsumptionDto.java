package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.common.helper.StringHelper;

@Data
@ToString(callSuper = false)
public class PetrolConsumptionDto {
	
	private String city;
	private String highWay;
	private String average;
	
	public void setAverage(String fuelCity, String fuelHigway) {
		if (StringHelper.empty(fuelCity) || StringHelper.empty(fuelHigway)) {
			this.average = null;
		} else {
			double result = (Double.parseDouble(fuelCity) + Double.parseDouble(fuelHigway)) / 2;
			this.average = String.valueOf(result);
		}
	}

}
