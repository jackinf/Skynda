package me.skynda.car.dao;

import me.skynda.car.dto.ImagesDto;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarFeature;
import me.skynda.car.model.CarImage;
import me.skynda.car.model.CarManufacturer;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface CarImageDao extends SkyndaBaseEntityDao<CarImage> {
    void addMultipleToCar(Car car, List<ImagesDto> images);
}
