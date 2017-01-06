package me.skynda.vehicle.dto;

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
			try {
				double result = (Double.parseDouble(fuelCity) + Double.parseDouble(fuelHigway)) / 2;
				this.average = String.valueOf(result);
			} catch (NumberFormatException e) {
				this.average = "0";
			}
		}
	}

	public String getAverage() {
		if (StringHelper.empty(this.city) || StringHelper.empty(this.highWay)) {
			this.average = null;
		} else {
			try {
				double result = (Double.parseDouble(this.city) + Double.parseDouble(this.highWay)) / 2;
				this.average = String.valueOf(result);
			} catch (NumberFormatException e) {
				this.average = null;
			}
		}

		return this.average;

	}

}
