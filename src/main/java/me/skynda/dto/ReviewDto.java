package me.skynda.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class ReviewDto {
	
	private String logoUrl;
	private String videoUrl;
	private String text;
	private String rating;

}
