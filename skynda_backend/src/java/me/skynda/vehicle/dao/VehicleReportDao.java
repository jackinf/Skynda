package me.skynda.vehicle.dao;

import me.skynda.common.db.BaseEntityDaoImpl;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.daos.IVehicleReportDao;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleReport;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Date;

@Repository
public class VehicleReportDao extends BaseEntityDaoImpl<VehicleReport> implements IVehicleReportDao {

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

        try {

            Criteria vehicleCriteria = session
                    .createCriteria(VehicleReport.class, "vehicleReport")
                    .createAlias("vehicleReport.items", "item");

            vehicleCriteria.add(Restrictions.eq("id", id));

            if(isActive){
                vehicleCriteria.add(Restrictions.isNull("archived"));
                vehicleCriteria.add(Restrictions.isNull("item.archived"));
            }

            queryResponse = (VehicleReport) vehicleCriteria.uniqueResult();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return queryResponse;
    }

    @Override
    public VehicleReport get(Serializable id) {
        return get(id, true);
    }


}
