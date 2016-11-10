package me.skynda.vehicle.dto.response;

import lombok.Data;

@Data
public class VehicleModelResponseDto {
    private int id;
    private String manufacturerCode;
    private String modelCode;
    private String title;
}
