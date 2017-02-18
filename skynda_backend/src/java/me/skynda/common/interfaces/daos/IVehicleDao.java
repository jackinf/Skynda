package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.request.SearchRequestDto;
import me.skynda.common.entities.Vehicle;

import java.io.Serializable;
import java.util.List;

public interface IVehicleDao extends SkyndaBaseEntityDao<Vehicle> {
    List<Vehicle> search(SearchRequestDto dto);
    Vehicle get(Serializable id);
    Vehicle get(Serializable id, Boolean isActive);
    void deleteEntity(Vehicle vehicleDescription, DeleteResponseDto response);
}
