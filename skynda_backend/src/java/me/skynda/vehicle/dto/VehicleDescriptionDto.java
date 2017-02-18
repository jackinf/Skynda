package me.skynda.vehicle.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class VehicleDescriptionDto extends BaseDto{
	private String title;
	private String content;
	private Integer vehicleId;
}
