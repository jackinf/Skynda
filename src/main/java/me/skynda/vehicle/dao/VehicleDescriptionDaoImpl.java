package me.skynda.vehicle.dao;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.interfaces.daos.VehicleDescriptionDao;
import me.skynda.vehicle.dto.DescriptionDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleDescription;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by jevgenir on 11/19/2016.
 */
@Repository
public class VehicleDescriptionDaoImpl extends SkyndaBaseEntityDaoImpl<VehicleDescription> implements VehicleDescriptionDao {

    @Override
    public void addMultipleToVehicle(Vehicle vehicle, List<DescriptionDto> descriptions) {

        Session session = getSession();
        String id = vehicle.getId().toString();
        session.createSQLQuery("DELETE FROM vehicle_description WHERE vehicle_id = "  + id)   // TODO: avoid SQL injection
//                .setParameter("xxx", id)
                .executeUpdate();

        if (descriptions == null)
            return;

        for (DescriptionDto description : descriptions) {
            VehicleDescription vehicleDescription = new VehicleDescription();
            vehicleDescription.setVehicleId(vehicle.getId());
            vehicleDescription.setTitle(description.getTitle());
            vehicleDescription.setContent(description.getContent());
            session.save(vehicleDescription);
        }
    }
}
