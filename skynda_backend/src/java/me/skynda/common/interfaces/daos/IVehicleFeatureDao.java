package me.skynda.common.interfaces.daos;

import me.skynda.vehicle.dto.VehicleFeatureDto;
import me.skynda.common.entities.Vehicle;
import me.skynda.common.entities.VehicleFeature;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface IVehicleFeatureDao extends SkyndaBaseEntityDao<VehicleFeature> {

    void addMultipleToVehicle(Vehicle vehicle, List<VehicleFeatureDto> features);

}
