package me.skynda.common.interfaces.daos;

import me.skynda.vehicle.entities.VehicleModel;
import me.skynda.common.db.SkyndaBaseEntityDao;

public interface IVehicleModelDao extends SkyndaBaseEntityDao<VehicleModel> {

	VehicleModel getByModelCode(String vehicleModelCode);

}
