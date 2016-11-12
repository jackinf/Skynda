package me.skynda.common.dao;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.vehicle.entity.Classification;

public interface ClassificationDao extends SkyndaBaseEntityDao<Classification> {
    Classification getManufacturer(String vehicleManufacturerCode);
}
