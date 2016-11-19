package me.skynda.vehicle.dao;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.interfaces.daos.VehicleReportDao;
import me.skynda.vehicle.dto.FeatureDto;
import me.skynda.vehicle.dto.VehicleReportCategoryItemAdminDto;
import me.skynda.vehicle.entities.VehicleFeature;
import me.skynda.vehicle.entities.VehicleReportCategory;
import me.skynda.vehicle.entities.VehicleReportCategoryItem;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by jevgenir on 11/14/2016.
 */
@Repository
public class VehicleReportDaoImpl  extends SkyndaBaseEntityDaoImpl<VehicleReportCategory> implements VehicleReportDao {
    @Override
    public void addMultipleToCategoryItems(VehicleReportCategory persistedVehicleReportCategory, List<VehicleReportCategoryItemAdminDto> items) {
        Session session = getSession();
        String id = persistedVehicleReportCategory.getId().toString();
        session.createSQLQuery("DELETE FROM vehicle_report_category_item WHERE vehicle_report_category_id = "  + id)   // TODO: avoid SQL injection
//                .setParameter("xxx", id)
                .executeUpdate();

        if (items == null)
            return;

        for (VehicleReportCategoryItemAdminDto dto : items) {
            VehicleReportCategoryItem vehicleReportCategoryItem = new VehicleReportCategoryItem();
            vehicleReportCategoryItem.setIsPass(dto.getIsPass());
            vehicleReportCategoryItem.setText(dto.getText());
            vehicleReportCategoryItem.setVehicleReportCategoryId(persistedVehicleReportCategory.getId());
            session.save(vehicleReportCategoryItem);
        }
    }
}
