package me.skynda.vehicle.dao;

import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.IVehicleDescriptionDao;
import me.skynda.vehicle.dto.DescriptionDto;
import me.skynda.common.entities.Vehicle;
import me.skynda.common.entities.VehicleDescription;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by jevgenir on 11/19/2016.
 */
@Repository
public class VehicleDescriptionDao extends BaseEntityDao<VehicleDescription> implements IVehicleDescriptionDao {

    private static Logger logger = LoggerFactory.getLogger(VehicleDescriptionDao.class);

    @Override
    public void addMultipleToVehicle(Vehicle vehicle, List<DescriptionDto> descriptions) {

        Session session = getSession();
        String id = vehicle.getId().toString();
        try {
            session.createSQLQuery("DELETE FROM vehicle_description WHERE vehicle_id = "  + id)   // TODO: avoid SQL injection
//                .setParameter("xxx", id)
                    .executeUpdate();
        } catch (Exception e) {
            logger.error("addMultipleToVehicle failed. vehicle: " + JsonHelper.toJson(vehicle)
                    + ", descriptions: " + JsonHelper.toJson(descriptions), e);
        }

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
