package me.skynda.common.interfaces.daos;


import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.entities.VehicleReport;
import java.io.Serializable;

public interface IVehicleReportDao extends SkyndaBaseEntityDao<VehicleReport> {
    void deleteEntity(VehicleReport report, DeleteResponseDto response);
    VehicleReport get(Serializable id, Boolean isActive);
    VehicleReport get(Serializable id);
}
