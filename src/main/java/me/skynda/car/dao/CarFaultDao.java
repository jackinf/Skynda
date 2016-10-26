package me.skynda.car.dao;

import me.skynda.car.dto.FaultsDto;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarFault;
import me.skynda.car.model.CarImage;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface CarFaultDao extends SkyndaBaseEntityDao<CarFault> {
    void addMultipleToCar(Car car, List<FaultsDto> faults);
}
