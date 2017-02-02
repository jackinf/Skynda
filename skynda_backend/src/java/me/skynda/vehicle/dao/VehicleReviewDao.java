package me.skynda.vehicle.dao;

import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.interfaces.daos.IVehicleReviewDao;
import me.skynda.vehicle.entities.VehicleReview;
import org.springframework.stereotype.Repository;

@Repository
public class VehicleReviewDao extends BaseEntityDao<VehicleReview> implements IVehicleReviewDao {
}
