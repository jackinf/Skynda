package me.skynda.vehicle.dao;

import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.IVehicleReportItemDao;
import me.skynda.vehicle.entities.VehicleReportItem;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Repository
public class VehicleReportItemDao extends BaseEntityDao<VehicleReportItem> implements IVehicleReportItemDao {

    private static Logger logger = LoggerFactory.getLogger(VehicleReportItemDao.class);

    @Override
    public VehicleReportItem saveOrUpdate(VehicleReportItem vehicleReportItem) {
        Transaction tx = null;
        Session session = getSession();
        try {
            tx = session.beginTransaction();

            if (vehicleReportItem.getId() == null) {
                session.save(vehicleReportItem);
            } else {
                VehicleReportItem existingItem =
                        (VehicleReportItem) session.createQuery("SELECT item FROM VehicleReportItem as item " +
                                "WHERE item.id = :id AND item.parentId = :parentId " +
                                "AND item.archived IS NULL")
                                .setParameter("id", vehicleReportItem.getId())
                                .setParameter("parentId", vehicleReportItem.getParentId())
                                .uniqueResult();

                if (existingItem == null) {
                    Exception exception = new Exception("Vehicle Report Item is null");
                    logger.error("saveOrUpdate failed. vehicleReportItem: " + JsonHelper.toJson(vehicleReportItem), exception);
                    throw exception;
                }

                existingItem.setIsPass(vehicleReportItem.getIsPass());
                existingItem.setText(vehicleReportItem.getText());
                existingItem.setTitle(vehicleReportItem.getTitle());
                session.update(existingItem);
                vehicleReportItem = existingItem;
            }

            tx.commit();
        } catch (Exception e) {
            if(tx != null)
                tx.rollback();
            logger.error("saveOrUpdate failed. vehicleReportItem: " + JsonHelper.toJson(vehicleReportItem), e);
            e.printStackTrace();
        }

        return vehicleReportItem;
    }

    @Override
    public void saveOrUpdate(Collection<VehicleReportItem> items) {
        for (VehicleReportItem t : items) {
            saveOrUpdate(t);
        }
    }

    @Override
    public void deleteEntity(VehicleReportItem vehicleReportItem, DeleteResponseDto response) {
        Transaction tx = null;
        Session session = getSession();
        Date now = new Date();
        try {
            tx = session.beginTransaction();
            int queryResponse = session
                    .createQuery(
                            "UPDATE VehicleReportItem " +
                                    "SET archived = :archived " +
                                    "WHERE id = :id AND vehicle_report_category_id = :parentId")
                    .setParameter("archived", now)
                    .setParameter("id", vehicleReportItem.getId())
                    .setParameter("parentId", vehicleReportItem.getParentId())

                    .executeUpdate();

            if (queryResponse < 1) {
                Exception exception = new Exception("Vehicle Report Item Delete failed: No such item found.");
                logger.error("deleteEntity failed. vehicleReportItem: " + JsonHelper.toJson(vehicleReportItem), exception);
                throw exception;
            }

            tx.commit();
            response.setSuccess(true);
        } catch (Exception e) {
            logger.error("deleteEntity failed. vehicleReportItem: " + JsonHelper.toJson(vehicleReportItem), e);
            e.printStackTrace();
            response.setError(e.getMessage());
            response.setSuccess(false);

            assert tx != null;
            tx.rollback();
        }
    }

    @Override
    public List<VehicleReportItem> getAllChildren(Integer parentId) {
        Session session = getSession();
        List items = null;

        try {
            Query query = session.createQuery("SELECT item FROM VehicleReportItem as item " +
                                    "WHERE item.parentId = :parentId " +
                                    "AND item.archived IS NULL")
                                    .setParameter("parentId", parentId);
            items = query.list();
        } catch (Exception e) {
            logger.error("getAllChildren failed. parentId: " + parentId, e);
            e.printStackTrace();
        }

        return items;
    }

    @Override
    public List getActiveItems(Serializable parentId) {
        Session session = getSession();
        try {

            Criteria items = session.createCriteria(VehicleReportItem.class, "item")
                    .add(Restrictions.eq("parentId", parentId))
                    .add(Restrictions.isNull("archived"));

            return items.list();

        } catch (Exception e) {
            logger.error("getActiveItems failed. parentId: " + parentId, e);
            e.printStackTrace();
        }

        return null;
    }
}
