package me.skynda.vehicle.dao;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.interfaces.daos.VehicleReportItemDao;
import me.skynda.vehicle.dto.VehicleReportItemDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleReportCategory;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class VehicleReportItemDaoImpl extends SkyndaBaseEntityDaoImpl<VehicleReportCategory> implements VehicleReportItemDao {

    @Override
    public void addMultipleToVehicle(Vehicle vehicle, List<VehicleReportItemDto> descriptions) {

        Session session = getSession();
        String id = vehicle.getId().toString();
        session.createSQLQuery("DELETE FROM vehicle_report_category WHERE vehicle_id = "  + id)   // TODO: avoid SQL injection
//                .setParameter("xxx", id)
                .executeUpdate();

        if (descriptions == null)
            return;

        for (VehicleReportItemDto reportItem : descriptions) {
            VehicleReportCategory vehicleDescription = new VehicleReportCategory();
            vehicleDescription.setVehicleId(vehicle.getId());
            vehicleDescription.setTitle(reportItem.getTitle());
            vehicleDescription.setDescription(reportItem.getDescription());
            session.save(vehicleDescription);
        }
    }
}
