package me.skynda.vehicle.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class VehicleDisplayDto {

	public Long id;
    private VehicleGeneralDto vehicleGeneralDto;
	private List<ImagesDto> images;
	private List<OverviewDto> overview;
	private List<DescriptionsDto> descriptions;
	private List<String> features;
	private HistoryDto history;
	private PetrolConsumptionDto petrolConsumption;
	private PerformanceDto performance;
	private Integer safetyStars;
	private ReportDto report;
	private List<ReviewDto> reviews;
	private BigDecimal price;

}
