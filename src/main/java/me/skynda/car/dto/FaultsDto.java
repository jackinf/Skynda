package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.car.dto.interfaces.IImageContainerableDto;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class FaultsDto extends BaseDto implements IImageContainerableDto {
	
	private String text;
    private ImageContainerDto imageContainer;

}
