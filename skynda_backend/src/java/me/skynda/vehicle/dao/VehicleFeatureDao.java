package me.skynda.vehicle.dao;

import me.skynda.common.interfaces.daos.IVehicleFeatureDao;
import me.skynda.vehicle.dto.FeatureDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleFeature;
import me.skynda.common.db.BaseEntityDao;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class VehicleFeatureDao extends BaseEntityDao<VehicleFeature> implements IVehicleFeatureDao {

    @Override
    public void addMultipleToVehicle(Vehicle vehicle, List<FeatureDto> features) {

        // TODO: Is feature a classifier or dynamic thing?

//        Session session = getSession();
//        String id = vehicle.getId().toString();
//        session.createSQLQuery("DELETE FROM vehicle_feature WHERE vehicle_id = "  + id)   // TODO: avoid SQL injection
////                .setParameter("xxx", id)
//                .executeUpdate();
//
//        if (features == null)
//            return;
//
//        for (FeatureDto feature : features) {
//            VehicleFeature vehicleFeature = new VehicleFeature();
//            vehicleFeature.setVehicleId(vehicle.getId());
////            vehicleFeature.setText(feature.getText());
//            session.save(vehicleFeature);
//        }
    }

}
