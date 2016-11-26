package me.skynda.vehicle.dao;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.interfaces.daos.VehicleReportItemDao;
import me.skynda.vehicle.dto.VehicleReportItemDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleReportItem;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by jevgenir on 11/20/2016.
 */
@Repository
public class VehicleReportItemDaoImpl extends SkyndaBaseEntityDaoImpl<VehicleReportItem> implements VehicleReportItemDao {

    @Override
    public void addMultipleToVehicle(Vehicle vehicle, List<VehicleReportItemDto> descriptions) {

        Session session = getSession();
        String id = vehicle.getId().toString();
        session.createSQLQuery("DELETE FROM vehicle_report_item WHERE vehicle_id = "  + id)   // TODO: avoid SQL injection
//                .setParameter("xxx", id)
                .executeUpdate();

        if (descriptions == null)
            return;

        for (VehicleReportItemDto reportItem : descriptions) {
            VehicleReportItem vehicleDescription = new VehicleReportItem();
            vehicleDescription.setVehicleId(vehicle.getId());
            vehicleDescription.setTitle(reportItem.getTitle());
            vehicleDescription.setDescription(reportItem.getDescription());
            session.save(vehicleDescription);
        }
    }
}
