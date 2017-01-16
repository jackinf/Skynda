package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.common.dto.BaseDto;

@Data
public class VehicleReportItemDto extends BaseDto {
    private Integer id;
    private String title;
    private String text;
    private Boolean isPass;
    private Integer parentId;
}
