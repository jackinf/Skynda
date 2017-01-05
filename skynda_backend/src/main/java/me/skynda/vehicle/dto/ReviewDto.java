package me.skynda.vehicle.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class ReviewDto extends BaseDto {

	private String text;
	private Integer rating;
	private ImageDto logo;
	private ImageDto video;

}
