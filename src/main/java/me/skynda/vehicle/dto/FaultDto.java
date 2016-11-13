package me.skynda.vehicle.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.vehicle.dto.interfaces.IImageContainerableDto;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class FaultDto extends BaseDto implements IImageContainerableDto {
	
	private String text;
    private ImageDto image;

}
