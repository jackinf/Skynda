package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.common.dto.BaseDto;

/**
 * Created by jevgenir on 11/19/2016.
 */
@Data
public class VehicleReportCategoryItemAdminDto extends BaseDto {
    private Integer id;
    private String text;
    private Boolean isPass;
}
