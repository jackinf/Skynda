package me.skynda.dao;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.model.CarModels;

public interface CarModelsDao extends SkyndaBaseEntityDao<CarModels> {

	CarModels getByModelCode(String carModelsCode);

}
