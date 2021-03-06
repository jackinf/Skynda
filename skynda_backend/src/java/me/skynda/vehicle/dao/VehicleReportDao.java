package me.skynda.vehicle.dao;

import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.IVehicleFaultDao;
import me.skynda.common.interfaces.daos.IVehicleReportDao;
import me.skynda.common.interfaces.daos.IVehicleReportItemDao;
import me.skynda.common.entities.VehicleReport;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Repository
public class VehicleReportDao extends BaseEntityDao<VehicleReport> implements IVehicleReportDao {

    private final IVehicleReportItemDao itemDao;
    private final IVehicleFaultDao faultDao;

    private static Logger logger = LoggerFactory.getLogger(VehicleReportDao.class);

    @Autowired
    public VehicleReportDao(IVehicleReportItemDao vehicleReportItemDao, IVehicleFaultDao faultDao) {
        itemDao = vehicleReportItemDao;
        this.faultDao = faultDao;
    }

    @Override
    public void deleteEntity(VehicleReport report, DeleteResponseDto response) {
        Transaction tx = null;
        Session session = getSession();
        Date now = new Date();
        try {
            tx = session.beginTransaction();
            int queryResponse = session
                    .createSQLQuery(
                            "UPDATE vehicle_report_category " +
                                    "SET archived = :archived " +
                                    "WHERE id = :id")
                    .setParameter("archived", now)
                    .setParameter("id", report.getId())

                    .executeUpdate();

            if (queryResponse < 1) {
                Exception exception = new Exception("Vehicle Report Item Delete failed: No such item found.");
                logger.error("deleteEntity failed. report: " + JsonHelper.toJson(report), exception);
                throw exception;
            }

            tx.commit();
            response.setSuccess(true);

        } catch (Exception e) {
            logger.error("deleteEntity failed. report: " + JsonHelper.toJson(report), e);
            e.printStackTrace();

            response.setError(e.getMessage());
            response.setSuccess(false);
            if(tx != null)
                tx.rollback();
        }
    }

    @Override
    public VehicleReport get(Serializable id) { return get(id, true); }

    @Override
    public VehicleReport get(Serializable id, Boolean isActive) {
        Session session = getSession();
        VehicleReport queryResponse = null;
        List itemsResult = null;
        List faultsResult = null;
        try {

            Criteria vehicleCriteria = session
                    .createCriteria(VehicleReport.class, "vehicleReport");

            vehicleCriteria.add(Restrictions.eq("id", id));

            if(isActive){
                vehicleCriteria.add(Restrictions.isNull("archived"));
                itemsResult = itemDao.getActiveItems(id);
                faultsResult = faultDao.getActiveFaults(id);
            }

            queryResponse = (VehicleReport) vehicleCriteria.uniqueResult();
            
            if(queryResponse != null && isActive){
                queryResponse.setItems(itemsResult);
                queryResponse.setFaults(faultsResult);
            }

        } catch (Exception e) {
            logger.error("get failed. id: " + id + ", isActive: " + isActive, e);
            e.printStackTrace();
        }

        return queryResponse;
    }

    @Override
    public List<VehicleReport> getAll(){
        return getAll(true);
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
                    List items = itemDao.getActiveItems(report.getId());
                    List faults = faultDao.getActiveFaults(report.getId());
                    report.setItems(items);
                    report.setFaults(faults);
                }
            }

            return queryResponse;

        } catch (Exception e) {
            logger.error("getAll failed. isActive: " + isActive, e);
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
                    .createCriteria(VehicleReport.class, "vehicleReport")
                    .add(Restrictions.eq("vehicleId", vehicleId));

            if(isActive){
                vehicleCriteria.add(Restrictions.isNull("archived"));
            }

            List<VehicleReport> queryResponse = vehicleCriteria.list();

            if(queryResponse != null && isActive){
                for (VehicleReport report: queryResponse) {
                    List items = itemDao.getActiveItems(report.getId());
                    List faults = faultDao.getActiveFaults(report.getId());
                    report.setItems(items);
                    report.setFaults(faults);
                }
            }

            return queryResponse;

        } catch (Exception e) {
            logger.error("getAllBy failed. vehicleId: " + vehicleId + ", isActive: " + isActive, e);
            e.printStackTrace();
        }

        return null;
    }


}
