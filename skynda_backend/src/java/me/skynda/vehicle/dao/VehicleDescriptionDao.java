package me.skynda.vehicle.dao;

import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.entities.VehicleDescription;
import me.skynda.common.interfaces.daos.IVehicleDescriptionDao;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Repository
public class VehicleDescriptionDao extends BaseEntityDao<VehicleDescription> implements IVehicleDescriptionDao {

    private static Logger logger = LoggerFactory.getLogger(VehicleDescriptionDao.class);

    @Override
    public List<VehicleDescription> getAllVehicleDescriptions(Integer id) {
        Session session = getSession();
        List items = null;

        try {
            Query query = session.createSQLQuery("SELECT item FROM vehicle_description as item " +
                    "WHERE item.vehicle_id = :vehicleId " +
                    "AND item.archived IS NULL")
                    .setParameter("vehicleId", id);

            items = query.list();

        } catch (Exception e) {
            logger.error("getAllVehicleDescriptions failed. vehicleId: " + id, e);
            e.printStackTrace();
        }

        return items;
    }

    @Override
    public void deleteEntity(VehicleDescription vehicleDescription, DeleteResponseDto response) {
        Transaction tx = null;
        Session session = getSession();
        Date now = new Date();
        try {
            tx = session.beginTransaction();
            int queryResponse = session
                    .createSQLQuery(
                            "UPDATE vehicle_description " +
                                    "SET archived = :archived " +
                                    "WHERE id = :id AND vehicle_id = :vehicleId")
                    .setParameter("archived", now)
                    .setParameter("id", vehicleDescription.getId())
                    .setParameter("vehicleId", vehicleDescription.getVehicleId())

                    .executeUpdate();

            if (queryResponse < 1) {
                Exception exception = new Exception("Vehicle Description Delete failed: No such item found.");
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

    @Override
    public VehicleDescription saveOrUpdate(VehicleDescription vehicleDescription) {
        Transaction tx = null;
        Session session = getSession();
        try {
            tx = session.beginTransaction();

            if (vehicleDescription.getId() == null) {
                session.save(vehicleDescription);
            } else {
                VehicleDescription existingItem =
                        (VehicleDescription) session.createSQLQuery("SELECT item FROM vehicle_description as item " +
                                "WHERE item.id = :id AND item.vehicle_id = :vehicleId " +
                                "AND item.archived IS NULL")
                                .setParameter("id", vehicleDescription.getId())
                                .setParameter("vehicleId", vehicleDescription.getVehicleId())
                                .uniqueResult();

                if (existingItem == null) {
                    Exception exception = new Exception("Vehicle Description is null");
                    logger.error("saveOrUpdate failed. ", exception);
                    throw exception;
                }

                existingItem.setContent(vehicleDescription.getContent());
                existingItem.setTitle(vehicleDescription.getTitle());
                session.update(existingItem);
                vehicleDescription = existingItem;
            }

            tx.commit();
        } catch (Exception e) {
            if(tx != null)
                tx.rollback();
            logger.error("saveOrUpdate failed. ", e);
            e.printStackTrace();
        }

        return vehicleDescription;
    }

    @Override
    public void saveOrUpdate(Collection<VehicleDescription> items) {
        for (VehicleDescription t : items) {
            saveOrUpdate(t);
        }
    }
}
