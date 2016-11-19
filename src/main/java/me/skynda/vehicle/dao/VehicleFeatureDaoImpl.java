package me.skynda.vehicle.dao;

import me.skynda.common.interfaces.daos.VehicleFeatureDao;
import me.skynda.vehicle.dto.FeatureDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleFeature;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class VehicleFeatureDaoImpl extends SkyndaBaseEntityDaoImpl<VehicleFeature> implements VehicleFeatureDao {

    @Override
    public void addMultipleToVehicle(Vehicle vehicle, List<FeatureDto> features) {

        Session session = getSession();
        String id = vehicle.getId().toString();
        session.createSQLQuery("DELETE FROM vehicle_feature WHERE vehicle_id = "  + id)   // TODO: avoid SQL injection
//                .setParameter("xxx", id)
                .executeUpdate();

        if (features == null)
            return;

        for (FeatureDto feature : features) {
            VehicleFeature vehicleFeature = new VehicleFeature();
            vehicleFeature.setVehicleId(vehicle.getId());
            vehicleFeature.setText(feature.getText());
            session.save(vehicleFeature);
        }
    }

}
