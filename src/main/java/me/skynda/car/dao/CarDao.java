package me.skynda.car.dao;

import me.skynda.car.dto.request.CarSearchRequestDto;
import me.skynda.car.model.Car;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface CarDao extends SkyndaBaseEntityDao<Car> {

    List<Car> search(CarSearchRequestDto dto);
}
