package me.skynda.vehicle.dto;

import lombok.Data;
import lombok.ToString;
import me.skynda.common.dto.BaseDto;

/**
 * Created by jevgenir on 11/20/2016.
 */
@Data
@ToString(callSuper = false)
public class VehicleReportItemDto extends BaseDto {
    private String title;
    private String description;
}
