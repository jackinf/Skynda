package me.skynda.vehicle.dao;

import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.daos.IVehicleReviewDao;
import me.skynda.vehicle.entities.VehicleReview;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Repository
public class VehicleReviewDao extends BaseEntityDao<VehicleReview> implements IVehicleReviewDao {

    @Override
    public void deleteEntity(VehicleReview review, DeleteResponseDto response) {
        Transaction tx = null;
        Session session = getSession();
        Date now = new Date();
        try {
            tx = session.beginTransaction();
            int queryResponse = session
                    .createQuery(
                            "UPDATE VehicleReview " +
                                    "SET archived = :archived " +
                                    "WHERE id = :id")
                    .setParameter("archived", now)
                    .setParameter("id", review.getId())

                    .executeUpdate();

            if (queryResponse < 1) {
                throw new Exception("Vehicle Report Item Delete failed: No such item found.");
            }

            tx.commit();
            response.setSuccess(true);

        } catch (Exception e) {
            e.printStackTrace();
            response.setError(e.getMessage());
            response.setSuccess(false);
            if(tx != null) tx.rollback();
        }
    }

    @Override
    public VehicleReview get(Serializable id) {
        return get(id, true);
    }

    @Override
    public VehicleReview get(Serializable id, Boolean isActive) {
        Session session = getSession();
        VehicleReview queryResponse = null;
        try {

            Criteria vehicleCriteria = session
                    .createCriteria(VehicleReview.class, "review");

            vehicleCriteria.add(Restrictions.eq("id", id));

            if(isActive){
                vehicleCriteria.add(Restrictions.isNull("archived"));
            }

            queryResponse = (VehicleReview) vehicleCriteria.uniqueResult();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return queryResponse;
    }

    @Override
    public List<VehicleReview> getAll() {
        return getAll(true);
    }

    @Override
    public List<VehicleReview> getAll(Boolean isActive){
        Session session = getSession();
        try {

            Criteria vehicleCriteria = session
                    .createCriteria(VehicleReview.class, "review");

            if(isActive){
                vehicleCriteria.add(Restrictions.isNull("archived"));
            }

            List<VehicleReview> queryResponse = vehicleCriteria.list();

            return queryResponse;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List getAllBy(Serializable vehicleId) {
        return getAllBy(vehicleId, true);
    }

    @Override
    public List getAllBy(Serializable vehicleId, Boolean isActive) {
        Session session = getSession();
        try {

            Criteria vehicleCriteria = session
                    .createCriteria(VehicleReview.class, "review")
                    .add(Restrictions.eq("vehicleId", vehicleId));

            if(isActive){
                vehicleCriteria.add(Restrictions.isNull("archived"));
            }

            List<VehicleReview> queryResponse = vehicleCriteria.list();

            return queryResponse;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public VehicleReview saveOrUpdate(VehicleReview vehicleReview) {
        Transaction tx = null;
        Session session = getSession();
        try {
            tx = session.beginTransaction();

            if (vehicleReview.getId() == null) {
                session.save(vehicleReview);
            } else {
                VehicleReview existingItem =
                        (VehicleReview) session.createQuery("SELECT item FROM VehicleReview as item " +
                                "WHERE item.id = :id AND item.vehicleId = :parentId " +
                                "AND item.archived IS NULL")
                                .setParameter("id", vehicleReview.getId())
                                .setParameter("parentId", vehicleReview.getVehicleId())
                                .uniqueResult();

                if (existingItem == null) {
                    throw new Exception("Vehicle Report Item is null");
                }

                existingItem.setLogo(vehicleReview.getLogo());
                existingItem.setText(vehicleReview.getText());
                existingItem.setRating(vehicleReview.getRating());
                existingItem.setVideo(vehicleReview.getVideo());
                session.update(existingItem);
                vehicleReview = existingItem;
            }

            tx.commit();
        } catch (Exception e) {
            if(tx != null) tx.rollback();
            e.printStackTrace();
        }

        return vehicleReview;
    }
}
