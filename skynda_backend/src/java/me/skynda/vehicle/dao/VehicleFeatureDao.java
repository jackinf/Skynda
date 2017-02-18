package me.skynda.vehicle.dao;

import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.entities.Feature;
import me.skynda.common.interfaces.daos.IVehicleFeatureDao;
import me.skynda.vehicle.dto.VehicleFeatureDto;
import me.skynda.common.entities.Vehicle;
import me.skynda.common.entities.VehicleFeature;
import me.skynda.common.db.BaseEntityDao;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Repository
public class VehicleFeatureDao extends BaseEntityDao<VehicleFeature> implements IVehicleFeatureDao {

    private static Logger logger = LoggerFactory.getLogger(VehicleFeatureDao.class);

    @Override
    public List<VehicleFeature> getAllBy(Serializable vehicleId) {
        return getAllBy(vehicleId, true);
    }

    @Override
    public List<VehicleFeature> getAllBy(Serializable vehicleId, Boolean isActive) {
        Session session = getSession();
        try {

            Criteria featureCriteria = session
                    .createCriteria(VehicleFeature.class, "vehicleFeature")
                    .add(Restrictions.eq("vehicleId", vehicleId));

            if(isActive){
                featureCriteria.add(Restrictions.isNull("archived"));
                featureCriteria.createAlias("vehicleFeature.feature", "feature");
                featureCriteria.add(Restrictions.isNull("feature.archived"));
            }

            List<VehicleFeature> queryResponse = featureCriteria.list();

            return queryResponse;

        } catch (Exception e) {
            logger.error("getAllBy failed. vehicleId: " + vehicleId + " isActive: " + isActive, e);
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void deleteEntity(VehicleFeature vehicleFeature, DeleteResponseDto response) {
        Transaction tx = null;
        Session session = getSession();
        Date now = new Date();
        try {
            tx = session.beginTransaction();
            int queryResponse = session
                    .createSQLQuery(
                            "UPDATE vehicle_feature " +
                                    "SET archived = :archived " +
                                    "WHERE id = :id AND vehicle_id = :vehicleId")
                    .setParameter("archived", now)
                    .setParameter("id", vehicleFeature.getId())
                    .setParameter("vehicleId", vehicleFeature.getVehicleId())

                    .executeUpdate();

            if (queryResponse < 1) {
                Exception exception = new Exception("Vehicle Feature Delete failed: No such item found.");
                logger.error("deleteEntity failed. ", exception);
                throw exception;
            }

            tx.commit();
            response.setSuccess(true);

        } catch (Exception e) {
            logger.error("deleteEntity failed. ", e);
            e.printStackTrace();
            response.setError(e.getMessage());
            response.setSuccess(false);

            assert tx != null;
            tx.rollback();
        }
    }
}
