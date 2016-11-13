package me.skynda.vehicle.dao.VehicleModelDao;

import me.skynda.vehicle.entity.VehicleModel;
import me.skynda.common.db.SkyndaBaseEntityDao;

public interface VehicleModelDao extends SkyndaBaseEntityDao<VehicleModel> {

	VehicleModel getByModelCode(String vehicleModelCode);

}
