package me.skynda.vehicle.dao.VehicleDao;

import me.skynda.vehicle.dto.request.SearchRequestDto;
import me.skynda.vehicle.entity.Vehicle;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface VehicleDao extends SkyndaBaseEntityDao<Vehicle> {
    List<Vehicle> search(SearchRequestDto dto);
}
