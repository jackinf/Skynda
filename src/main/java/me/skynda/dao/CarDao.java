package me.skynda.dao;

import java.util.List;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.model.Car;

public interface CarDao extends SkyndaBaseEntityDao<Car> {

	List<Car> test();
}
