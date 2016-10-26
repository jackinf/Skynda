package me.skynda.car.dao;

import me.skynda.car.dto.CarDto;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarFeature;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface CarFeatureDao extends SkyndaBaseEntityDao<CarFeature> {

    void addMultipleToCar(Car car, List<CarDto.FeatureDto> features);

}
