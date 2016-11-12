package me.skynda.vehicle.dao;

import me.skynda.vehicle.dto.request.VehicleSearchRequestDto;
import me.skynda.vehicle.entity.Vehicle;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface VehicleDao extends SkyndaBaseEntityDao<Vehicle> {

    List<Vehicle> search(VehicleSearchRequestDto dto);
}
