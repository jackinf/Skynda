package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.entities.VehicleFeature;

import java.io.Serializable;
import java.util.List;

public interface IVehicleFeatureDao extends SkyndaBaseEntityDao<VehicleFeature> {
    List<VehicleFeature> getAllBy(Serializable vehicleId);
    List<VehicleFeature> getAllBy(Serializable vehicleId, Boolean isActive);
    void deleteEntity(VehicleFeature vehicleDescription, DeleteResponseDto response);
}
