package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class FaultsDto extends BaseDto {
	
	private String text;
	private String img;
	private String blobName;
	private String contaienrName;

}
