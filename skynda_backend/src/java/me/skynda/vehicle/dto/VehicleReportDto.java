package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.common.dto.BaseDto;

import java.util.ArrayList;
import java.util.List;

@Data
public class VehicleReportDto extends BaseDto {
    public VehicleReportDto() {
        items = new ArrayList<>();
    }
    private Integer id;
    private Integer vehicleId;
    private String title;
    private String description;
    private String inspector;
    private List<VehicleReportItemDto> items;
    private List<FaultBaseDto> faults;
    private Boolean isModal;
}
