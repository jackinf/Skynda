package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.vehicle.dto.request.SearchRequestDto;
import me.skynda.vehicle.entities.Vehicle;

import java.util.List;

public interface IVehicleDao extends SkyndaBaseEntityDao<Vehicle> {
    List<Vehicle> search(SearchRequestDto dto);
}
