package me.skynda.vehicle.dao;

import me.skynda.vehicle.dto.FeatureDto;
import me.skynda.vehicle.model.Vehicle;
import me.skynda.vehicle.model.VehicleFeature;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface VehicleFeatureDao extends SkyndaBaseEntityDao<VehicleFeature> {

    void addMultipleToVehicle(Vehicle vehicle, List<FeatureDto> features);

}
