package me.skynda.vehicle.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.ToString;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class VehicleDto extends BaseDto {
    public VehicleDto() {
        this.filesToDelete = new ArrayList<>();
    }

    private ImageContainerDto mainImageContainer;
	private String vehicleModelsCode;
	private String vinCode;
	private BigDecimal price;
	private String registrationNumber;
	private BigDecimal mileage;
	private String colorOutside;
	private String colorInside;
	private List<ImagesDto> images;
	private Boolean isSold;
	private String fuelCity;
	private String fuelHighway;
	private List<FeatureDto> features;
	private List<FaultsDto> faults;
	private PerformanceDto performance;
	private Integer safetyStars;

    /**
     * files that are prepared to be deleted from file cloud storage.
     * We delete files by blobName and blobContainer
     */
	private List<VehicleDtoImageFileToDelete> filesToDelete;
}
