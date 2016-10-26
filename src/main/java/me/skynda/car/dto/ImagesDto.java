package me.skynda.car.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class ImagesDto extends BaseDto {
	
	String original;
	String thumbnail;

}
