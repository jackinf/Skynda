package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.car.dto.interfaces.IImageContainerableDto;
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
