package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.entities.VehicleReportItem;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

public interface IVehicleReportItemDao extends SkyndaBaseEntityDao<VehicleReportItem> {
    VehicleReportItem saveOrUpdate(VehicleReportItem vehicleReportItem);
    void saveOrUpdate(Collection<VehicleReportItem> items);
    void deleteEntity(VehicleReportItem vehicleReportItem, DeleteResponseDto response);
    List<VehicleReportItem> getAllChildren(Integer parentId);
    List getActiveItems(Serializable parentId);
}
