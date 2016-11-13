package me.skynda.common.dto;

import lombok.Data;
import me.skynda.vehicle.dto.VehicleSearchDto;

import java.util.List;

@Data
public class SearchResponseDto {
    private boolean success;
    private List<VehicleSearchDto> vehicles;
}
