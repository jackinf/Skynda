package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.classification.entities.Classification;

public interface ClassificationDao extends SkyndaBaseEntityDao<Classification> {
    Classification getManufacturer(String vehicleManufacturerCode);
}
