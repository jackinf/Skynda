package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.common.dto.BaseDto;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jevgenir on 11/14/2016.
 */
@Data
public class VehicleReportCategoryAdminDto extends BaseDto {
    public VehicleReportCategoryAdminDto() {
        items = new ArrayList<>();
    }

    private Integer id;
    private Integer VehicleId;
    private String title;
    private List<VehicleReportCategoryItemAdminDto> items;
}
