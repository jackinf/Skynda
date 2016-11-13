package me.skynda.vehicle.dao.VehicleImageDao;

import me.skynda.vehicle.dto.ImageContainerDto;
import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.vehicle.entity.Vehicle;
import me.skynda.vehicle.entity.VehicleImage;

import java.util.List;

public interface VehicleImageDao extends SkyndaBaseEntityDao<VehicleImage> {
    void addMultipleToVehicle(Vehicle vehicle, List<ImageContainerDto> images);
}
