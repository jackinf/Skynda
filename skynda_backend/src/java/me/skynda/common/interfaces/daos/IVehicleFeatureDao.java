package me.skynda.common.interfaces.daos;

import me.skynda.vehicle.dto.FeatureDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleFeature;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface IVehicleFeatureDao extends SkyndaBaseEntityDao<VehicleFeature> {

    void addMultipleToVehicle(Vehicle vehicle, List<FeatureDto> features);

}
