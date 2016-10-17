package me.skynda.dao;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.model.CarManufacturer;

public interface CarManufacturerDao extends SkyndaBaseEntityDao<CarManufacturer> {

	CarManufacturer getByManufacturerCode(String carManufacturer);

}
