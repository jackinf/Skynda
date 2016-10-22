package me.skynda.car.dao;

import org.springframework.stereotype.Repository;

import me.skynda.car.model.Car;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;

@Repository
public class CarDaoImpl extends SkyndaBaseEntityDaoImpl<Car> implements CarDao{
	
}
