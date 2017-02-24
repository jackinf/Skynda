package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.common.dto.BaseDto;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

@Data
public class VehicleReviewAdminDto extends BaseDto {

    private Integer vehicleId;
    //Matches url
    private ImageDto logo;
    private ImageDto video;

    @NotNull
    private String text;

    @NotNull
    @DecimalMin("0")
    private Integer rating;

    private Boolean isModal;

}
