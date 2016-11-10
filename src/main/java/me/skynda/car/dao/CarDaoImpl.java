package me.skynda.car.dao;

import me.skynda.car.dto.request.CarSearchRequestDto;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.stereotype.Repository;

import me.skynda.car.model.Car;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;

import java.util.List;

@Repository
public class CarDaoImpl extends SkyndaBaseEntityDaoImpl<Car> implements CarDao{

    @Override
    public List<Car> search(CarSearchRequestDto params) {

        if (params.Brands != null) {

        }

        if (params.Colors != null) {

        }

        if (params.Features != null) {

        }

        if (params.Doors != null) {

        }

        if (params.Seats != null) {

        }

        if (params.Transmission != null) {

        }

        if (params.Mileage != null) {

        }

        if (params.Price != null) {

        }

        if (params.Year != null) {

        }

        if (params.PetrolConsumption != null) {

        }

        if (params.Power != null) {

        }
        throw new NotImplementedException("Otsing on implementeerimata");
    }
}
