package me.skynda.vehicle.dao;

import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.daos.IVehicleReportItemDao;
import me.skynda.vehicle.entities.VehicleReportItem;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Repository
public class VehicleReportItemDao extends BaseEntityDao<VehicleReportItem> implements IVehicleReportItemDao {

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
                    throw new Exception("Vehicle Report Item is null");
                }

                existingItem.setIsPass(vehicleReportItem.getIsPass());
                existingItem.setText(vehicleReportItem.getText());
                existingItem.setTitle(vehicleReportItem.getTitle());
                session.update(existingItem);
                vehicleReportItem = existingItem;
            }

            tx.commit();
        } catch (Exception e) {
            if(tx != null) tx.rollback();
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
                throw new Exception("Vehicle Report Item Delete failed: No such item found.");
            }

            tx.commit();
            response.setSuccess(true);
        } catch (Exception e) {
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
            e.printStackTrace();
        }

        return items;
    }
}
