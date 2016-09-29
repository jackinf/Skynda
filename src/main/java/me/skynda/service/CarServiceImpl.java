package me.skynda.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.skynda.dao.CarDao;
import me.skynda.model.Car;

@Service
public class CarServiceImpl implements CarService {
	
	@Autowired
	CarDao carDao;
	
	@Override
	public List<Car> getCars() {
		return carDao.getAll();
	}
	
}
