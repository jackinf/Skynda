package me.skynda.dao;

import org.springframework.stereotype.Repository;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.model.Car;

@Repository
public class CarDaoImpl extends SkyndaBaseEntityDaoImpl<Car> implements CarDao{
	
}
