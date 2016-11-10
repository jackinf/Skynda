package me.skynda.car.dao;

import me.skynda.car.model.CarModel;
import me.skynda.common.db.SkyndaBaseEntityDao;

public interface CarModelsDao extends SkyndaBaseEntityDao<CarModel> {

	CarModel getByModelCode(String carModelsCode);

}
