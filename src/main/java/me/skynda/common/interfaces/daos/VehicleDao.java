package me.skynda.common.interfaces.daos;

import me.skynda.vehicle.dto.request.SearchRequestDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface VehicleDao extends SkyndaBaseEntityDao<Vehicle> {
    List<Vehicle> search(SearchRequestDto dto);
}
