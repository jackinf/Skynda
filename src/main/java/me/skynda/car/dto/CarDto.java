package me.skynda.car.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;
import lombok.ToString;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class CarDto extends BaseDto {
    public CarDto() {
        this.filesToUpload = new CarDtoFiles();
    }

	private String carModelsCode;
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
     * base64 files that are prepared to be uploaded to file cloud storage
     */
    private CarDtoFiles filesToUpload;

    /**
     * base64 files that are prepared to be deleted from file cloud storage
     */
    private CarDtoFiles filesToDelete;
}
