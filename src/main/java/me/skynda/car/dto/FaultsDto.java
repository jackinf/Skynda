package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class FaultsDto extends BaseDto {
	
	private String text;

	/**
	 * Shows image using url
	 */
	private String img;

	private String base64File;	// TODO: use this for uploads
	private String blobName;
	private String contaienrName;

}
