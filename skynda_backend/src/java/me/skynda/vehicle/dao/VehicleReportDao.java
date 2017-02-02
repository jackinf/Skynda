package me.skynda.vehicle.dao;

import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.daos.IVehicleReportDao;
import me.skynda.vehicle.entities.VehicleReport;
import me.skynda.vehicle.entities.VehicleReportItem;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Repository
public class VehicleReportDao extends BaseEntityDao<VehicleReport> implements IVehicleReportDao {

    @Override
    public void deleteEntity(VehicleReport report, DeleteResponseDto response) {
        Transaction tx = null;
        Session session = getSession();
        Date now = new Date();
        try {
            tx = session.beginTransaction();
            int queryResponse = session
                    .createQuery(
                            "UPDATE VehicleReport " +
                                    "SET archived = :archived " +
                                    "WHERE id = :id")
                    .setParameter("archived", now)
                    .setParameter("id", report.getId())

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
    public VehicleReport get(Serializable id, Boolean isActive) {
        Session session = getSession();
        VehicleReport queryResponse = null;
        List itemsResult = null;
        try {

            Criteria vehicleCriteria = session
                    .createCriteria(VehicleReport.class, "vehicleReport");

            vehicleCriteria.add(Restrictions.eq("id", id));

            if(isActive){
                vehicleCriteria.add(Restrictions.isNull("archived"));
                itemsResult = getActiveItems(id);
            }

            queryResponse = (VehicleReport) vehicleCriteria.uniqueResult();
            
            if(queryResponse != null && isActive){
                queryResponse.setItems(itemsResult);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return queryResponse;
    }

    @Override
    public VehicleReport get(Serializable id) {
        return get(id, true);
    }

    @Override
    public List<VehicleReport> getAll(Boolean isActive){
        Session session = getSession();
        try {

            Criteria vehicleCriteria = session
                    .createCriteria(VehicleReport.class, "vehicleReport");

            if(isActive){
                vehicleCriteria.add(Restrictions.isNull("archived"));
            }

            List<VehicleReport> queryResponse = vehicleCriteria.list();

            if(queryResponse != null && isActive){
                for (VehicleReport report: queryResponse) {
                    List items = getActiveItems(report.getId());
                    report.setItems(items);
                }
            }

            return queryResponse;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<VehicleReport> getAll(){
        return getAll(true);
    }

    @Override
    public List getActiveItems(Serializable parentId){
        Session session = getSession();
        try {

            Criteria items = session.createCriteria(VehicleReportItem.class, "item")
                    .add(Restrictions.eq("parentId", parentId))
                    .add(Restrictions.isNull("archived"));

            return items.list();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

}
