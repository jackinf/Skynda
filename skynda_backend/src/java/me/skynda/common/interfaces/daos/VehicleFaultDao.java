package me.skynda.common.interfaces.daos;

import me.skynda.vehicle.dto.FaultBaseDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleFault;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface VehicleFaultDao extends SkyndaBaseEntityDao<VehicleFault> {
    void addMultipleToVehicle(Vehicle vehicle, List<FaultBaseDto> faults);
}
