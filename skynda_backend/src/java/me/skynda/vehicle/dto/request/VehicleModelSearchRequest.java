package me.skynda.vehicle.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class VehicleModelSearchRequest {
    private List<Integer> manufacturerIds;
}
