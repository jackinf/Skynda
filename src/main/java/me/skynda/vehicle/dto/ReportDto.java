package me.skynda.vehicle.dto;

import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class ReportDto {

	private List<CategoriesDto> categories;
	private List<FaultBaseDto> faults;
}
