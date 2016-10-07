package me.skynda.dto;

import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class SingleCarDataDto {
	
	private CarGeneralDto carGeneralDto;
	private List<ImagesDto> images;
	private List<OverviewDto> overview;
	private List<DescriptionsDto> descriptions;
	private List<String> features;
	private HistoryDto history;
	private PetrolConsumptionDto petrolConsumption;
	private PerformanceDto performance;
	private String safetyStars;
	private List<ReportDto> report;
	private List<ReviewDto> review;

}
