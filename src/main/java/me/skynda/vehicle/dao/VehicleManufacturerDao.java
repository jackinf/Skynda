package me.skynda.vehicle.dao;

import me.skynda.vehicle.model.VehicleManufacturer;
import me.skynda.common.db.SkyndaBaseEntityDao;

public interface VehicleManufacturerDao extends SkyndaBaseEntityDao<VehicleManufacturer> {

	VehicleManufacturer getByManufacturerCode(String carManufacturer);

}
