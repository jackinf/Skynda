package me.skynda.common.interfaces.daos;


import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.vehicle.dto.VehicleReportCategoryItemAdminDto;
import me.skynda.vehicle.entities.VehicleReportCategory;

import java.util.List;

public interface VehicleReportDao extends SkyndaBaseEntityDao<VehicleReportCategory> {
    void addMultipleToCategoryItems(VehicleReportCategory persistedVehicleReportCategory,
                                    List<VehicleReportCategoryItemAdminDto> items);
}
