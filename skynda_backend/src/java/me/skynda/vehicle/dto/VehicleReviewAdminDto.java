package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.common.dto.BaseDto;

@Data
public class VehicleReviewAdminDto extends BaseDto {

    private Integer vehicleId;
    private ImageDto logo;
    private ImageDto video;
    private String text;
    private Integer rating;
    private Boolean isModal;

}
