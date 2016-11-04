package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class FaultsDto extends BaseDto {
	
	private String text;
    private ImageContainerDto imageContainer;

//	/**
//	 * Shows image using url
//	 */
//	private String imageUrl;
//	private String base64File;	// TODO: use this for uploads
//	private String blobName;
//	private String containerName;

}
