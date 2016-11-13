package me.skynda.vehicle.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.vehicle.dto.interfaces.IImageContainerableDto;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class ImageContainerDto extends BaseDto implements IImageContainerableDto {

	/**
	 * Image url
	 */
	private ImageDto image;

	/**
	 * Small image url
	 */
	private String thumbnail;

}
