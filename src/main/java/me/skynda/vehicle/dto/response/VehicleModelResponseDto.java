package me.skynda.vehicle.dto.response;

import lombok.Data;

@Data
public class VehicleModelResponseDto {
    private Integer id;
    private String vehicleManufacturerCode;
    private String modelCode;
    private String title;
}
