package me.skynda.vehicle.dao;

import me.skynda.common.interfaces.daos.VehicleDao;
import me.skynda.vehicle.dto.request.SearchRequestDto;
import me.skynda.vehicle.entities.Vehicle;
import org.apache.commons.lang3.NotImplementedException;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;

import java.util.List;

@Repository
public class VehicleDaoImpl extends SkyndaBaseEntityDaoImpl<Vehicle> implements VehicleDao {

    @Override
    public List<Vehicle> search(SearchRequestDto params) {

        Session session = getSession();
        List<Vehicle> vehicles = this.getAll();

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
