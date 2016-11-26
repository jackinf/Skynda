package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.common.dto.BaseDto;

/**
 * Created by jevgenir on 11/14/2016.
 */
@Data
public class VehicleReviewAdminDto extends BaseDto {

    private Integer vehicleId;
    private ImageDto logo;
    private ImageDto video;
    private String text;
    private Integer rating;

}
