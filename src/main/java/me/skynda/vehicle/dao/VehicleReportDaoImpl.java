package me.skynda.vehicle.dao;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.interfaces.daos.VehicleReportDao;
import me.skynda.vehicle.entities.VehicleReport;
import org.springframework.stereotype.Repository;

/**
 * Created by jevgenir on 11/14/2016.
 */
@Repository
public class VehicleReportDaoImpl  extends SkyndaBaseEntityDaoImpl<VehicleReport> implements VehicleReportDao {
}
