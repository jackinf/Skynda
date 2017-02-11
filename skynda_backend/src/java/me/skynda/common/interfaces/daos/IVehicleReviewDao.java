package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.entities.VehicleReportItem;
import me.skynda.vehicle.entities.VehicleReview;

import java.io.Serializable;
import java.util.List;

public interface IVehicleReviewDao extends SkyndaBaseEntityDao<VehicleReview> {
    void deleteEntity(VehicleReview review, DeleteResponseDto response);
    VehicleReview get(Serializable id, Boolean isActive);
    VehicleReview get(Serializable id);
    List<VehicleReview> getAll(Boolean isActive);
    List<VehicleReview> getAll();
    List getAllBy(Serializable vehicleId);
    List getAllBy(Serializable vehicleId, Boolean isActive);
    VehicleReview saveOrUpdate(VehicleReview vehicleReportItem);
}
