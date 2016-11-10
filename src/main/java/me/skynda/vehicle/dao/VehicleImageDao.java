package me.skynda.vehicle.dao;

import me.skynda.vehicle.dto.ImagesDto;
import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.vehicle.model.Vehicle;
import me.skynda.vehicle.model.VehicleImage;

import java.util.List;

public interface VehicleImageDao extends SkyndaBaseEntityDao<VehicleImage> {
    void addMultipleToVehicle(Vehicle vehicle, List<ImagesDto> images);
}
