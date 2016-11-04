package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class ImagesDto extends BaseDto {

	/**
	 * Image url
	 */
	private ImageContainerDto imageContainer;
//	private String original;
//	private String blobName;
//	private String containerName;

	/**
	 * Small image url
	 */
	private String thumbnail;

}
