package me.skynda.vehicle.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.common.interfaces.dtos.ImageContainerBaseDto;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class FaultBaseDto extends BaseDto implements ImageContainerBaseDto {
	
	private String text;
    private ImageDto image;

}
