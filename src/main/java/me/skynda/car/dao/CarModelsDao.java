package me.skynda.car.dao;

import me.skynda.car.model.CarModels;
import me.skynda.common.db.SkyndaBaseEntityDao;

public interface CarModelsDao extends SkyndaBaseEntityDao<CarModels> {

	CarModels getByModelCode(String carModelsCode);

}
