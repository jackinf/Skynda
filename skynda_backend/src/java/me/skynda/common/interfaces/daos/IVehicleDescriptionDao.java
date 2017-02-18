package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.VehicleDescriptionDto;
import me.skynda.common.entities.Vehicle;
import me.skynda.common.entities.VehicleDescription;

import java.util.Collection;
import java.util.List;

public interface IVehicleDescriptionDao extends SkyndaBaseEntityDao<VehicleDescription> {
    List<VehicleDescription> getAllVehicleDescriptions(Integer id);
    void deleteEntity(VehicleDescription vehicleDescription, DeleteResponseDto response);
    VehicleDescription saveOrUpdate(VehicleDescription vehicleReportItem);
    void saveOrUpdate(Collection<VehicleDescription> items);
}
