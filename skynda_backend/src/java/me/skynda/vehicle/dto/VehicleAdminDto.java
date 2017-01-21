package me.skynda.vehicle.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.ToString;
import me.skynda.classification.dto.ClassificationDto;
import me.skynda.common.dto.BaseDto;

@Data
@ToString(callSuper = false)
public class VehicleAdminDto extends BaseDto implements ImageStorable<ImageDto> {
    public VehicleAdminDto() {
        this.filesToDelete = new ArrayList<>();
    }

	private String vinCode;
	private BigDecimal price;
	private String registrationNumber;
	private BigDecimal mileage;
	private String colorOutsideHex;
	private String colorInsideHex;
	private BigDecimal fuelCity;
	private BigDecimal fuelHighway;
	private String problems;
	private Integer compressionRatio;
	private String compressionType;
	private String configuration;
	private String cylinders;
	private String displacement;
	private String size;
	private Integer torque;
	private Integer totalValves;
	private String additional;

	private ImageDto mainImage;
	private VehicleModelDto model;

	private PerformanceDto performance;
	private Integer safetyStars;
	private String safetyUrl;

	private List<FeatureDto> features;
	private List<FaultBaseDto> faults;
	private List<VehicleReportItemDto> reportItems;
	private List<ImageContainerDto> images;
	private List<DescriptionDto> descriptions;
	private List<ReviewDto> reviews;

//	private String vehicleModelCode;

//    /**
//     * base64 files that are prepared to be uploaded to file cloud storage.
//     * We add files by base64 file string and item's id.
//     */
//    private VehicleDtoFilesToUpload filesToUpload;

    /**
     * files that are prepared to be deleted from file cloud storage.
     * We delete files by blobName and blobContainer
     */
	private List<VehicleDtoImageFileToDelete> filesToDelete;

	public ImageDto getImage() {
		return getMainImage();
	}
}
