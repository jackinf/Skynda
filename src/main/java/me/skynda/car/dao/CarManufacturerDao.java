package me.skynda.car.dao;

import me.skynda.car.model.CarManufacturer;
import me.skynda.common.db.SkyndaBaseEntityDao;

public interface CarManufacturerDao extends SkyndaBaseEntityDao<CarManufacturer> {

	CarManufacturer getByManufacturerCode(String carManufacturer);

}
