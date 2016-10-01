package me.skynda.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.model.Car;

@Repository
public class CarDaoImpl extends SkyndaBaseEntityDaoImpl<Car> implements CarDao{

	@Override
	public List<Car> test() {
		List<Car> cars = new ArrayList<Car>();
		cars.add(new Car());
		return cars;
	}
	
}
