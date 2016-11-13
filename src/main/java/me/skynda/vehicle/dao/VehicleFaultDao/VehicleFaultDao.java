package me.skynda.vehicle.dao.VehicleFaultDao;

import me.skynda.vehicle.dto.FaultDto;
import me.skynda.vehicle.entity.Vehicle;
import me.skynda.vehicle.entity.VehicleFault;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface VehicleFaultDao extends SkyndaBaseEntityDao<VehicleFault> {
    void addMultipleToVehicle(Vehicle vehicle, List<FaultDto> faults);
}
