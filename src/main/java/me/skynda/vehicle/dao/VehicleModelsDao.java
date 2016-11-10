package me.skynda.vehicle.dao;

import me.skynda.vehicle.model.VehicleModel;
import me.skynda.common.db.SkyndaBaseEntityDao;

public interface VehicleModelsDao extends SkyndaBaseEntityDao<VehicleModel> {

	VehicleModel getByModelCode(String vehicleModelCode);

}
