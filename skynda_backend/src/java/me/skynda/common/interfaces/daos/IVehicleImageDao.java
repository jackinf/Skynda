package me.skynda.common.interfaces.daos;

import me.skynda.vehicle.dto.ImageContainerDto;
import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleImage;

import java.util.List;

public interface IVehicleImageDao extends SkyndaBaseEntityDao<VehicleImage> {
    void addMultipleToVehicle(Vehicle vehicle, List<ImageContainerDto> images);
}
