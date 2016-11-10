package me.skynda.common.dto;

import lombok.Data;
import me.skynda.vehicle.dto.VehicleGeneralDto;

import java.util.List;

@Data
public class SearchResponseDto {
    private boolean success;
    private List<VehicleGeneralDto> vehicles;
}
