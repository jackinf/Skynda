package me.skynda.car.dto;

import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class CategoriesDto {
	
	private String title;
	private List<PointsDto> points;

}
