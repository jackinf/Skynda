package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.vehicle.dto.DescriptionDto;
import me.skynda.common.entities.Vehicle;
import me.skynda.common.entities.VehicleDescription;

import java.util.List;

/**
 * Created by jevgenir on 11/19/2016.
 */
public interface IVehicleDescriptionDao extends SkyndaBaseEntityDao<VehicleDescription> {
    void addMultipleToVehicle(Vehicle vehicle, List<DescriptionDto> descriptions);
}
