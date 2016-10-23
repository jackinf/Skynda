package me.skynda.car.dto;

import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class SingleCarDataDto {

	public Long id;
	private CarGeneralDto carGeneralDto;
	private List<ImagesDto> images;
	private List<OverviewDto> overview;
	private List<DescriptionsDto> descriptions;
	private List<String> features;
	private HistoryDto history;
	private PetrolConsumptionDto petrolConsumption;
	private PerformanceDto performance;
	private Integer safetyStars;
	private List<ReportDto> report;
	private List<ReviewDto> reviews;

}
