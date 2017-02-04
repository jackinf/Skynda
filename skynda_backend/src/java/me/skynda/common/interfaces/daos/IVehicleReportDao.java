package me.skynda.common.interfaces.daos;


import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.entities.VehicleReport;
import java.io.Serializable;
import java.util.List;

public interface IVehicleReportDao extends SkyndaBaseEntityDao<VehicleReport> {
    void deleteEntity(VehicleReport report, DeleteResponseDto response);
    VehicleReport get(Serializable id, Boolean isActive);
    VehicleReport get(Serializable id);
    List<VehicleReport> getAll(Boolean isActive);
    List<VehicleReport> getAll();
    List getActiveItems(Serializable parentId);
    List getActiveFaults(Serializable reportCategoryId);
}
