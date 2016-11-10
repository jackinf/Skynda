package me.skynda.vehicle.dao;

import me.skynda.vehicle.dto.FaultsDto;
import me.skynda.vehicle.model.Vehicle;
import me.skynda.vehicle.model.VehicleFault;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface VehicleFaultDao extends SkyndaBaseEntityDao<VehicleFault> {
    void addMultipleToVehicle(Vehicle vehicle, List<FaultsDto> faults);
}
