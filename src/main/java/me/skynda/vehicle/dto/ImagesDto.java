package me.skynda.vehicle.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.vehicle.dto.interfaces.IImageContainerableDto;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class ImagesDto extends BaseDto implements IImageContainerableDto {

	/**
	 * Image url
	 */
	private ImageContainerDto imageContainer;

	/**
	 * Small image url
	 */
	private String thumbnail;

}
