package me.skynda.vehicle.dao;

import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.entities.VehicleModel;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.IVehicleModelDao;
import me.skynda.common.entities.VehicleModel;
import me.skynda.vehicle.dto.request.VehicleModelSearchRequest;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

import java.util.*;

@Repository
public class VehicleModelDao extends BaseEntityDao<VehicleModel> implements IVehicleModelDao {

	private static Logger logger = LoggerFactory.getLogger(VehicleModelDao.class);

	@Override
	public VehicleModel getByModelCode(String carModelsCode) {
		try {
			Criteria c = getSession().createCriteria(VehicleModel.class, "cm");
			c.add(Restrictions.eq("cm.modelCode", carModelsCode));
			return (VehicleModel) c.uniqueResult();
		} catch (Exception e) {
			logger.error("getByModelCode failed. carModelsCode: " + JsonHelper.toJson(carModelsCode), e);
			throw e;
		}
	}

	@Override
	public void deleteEntity(VehicleModel model, DeleteResponseDto response) {
		Transaction tx = null;
		Session session = getSession();
		Date now = new Date();
		try {
			tx = session.beginTransaction();
			int queryResponse = session
					.createQuery(
							"UPDATE VehicleModel " +
									"SET archived = :archived " +
									"WHERE id = :id")
					.setParameter("archived", now)
					.setParameter("id", model.getId())

					.executeUpdate();

			if (queryResponse < 1) {
				Exception exception = new Exception("Vehicle Model Delete failed: No such item found.");
				logger.error("deleteEntity failed. model: " + JsonHelper.toJson(model), exception);
				throw exception;
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
	public List<VehicleModel> getAll() {
		return getAll(true);
	}

	@Override
	public List<VehicleModel> getAll(Boolean isActive) {
		Session session = getSession();
		try {

			Criteria vehicleCriteria = session
					.createCriteria(VehicleModel.class, "model");

			if(isActive){
				vehicleCriteria.add(Restrictions.isNull("archived"));
			}

			List<VehicleModel> queryResponse = vehicleCriteria.list();

			return queryResponse;

		} catch (Exception e) {
			logger.error("getAll failed. isActive: " + isActive, e);
			e.printStackTrace();
		}

		return null;
	}

	public List<VehicleModel> search(VehicleModelSearchRequest params) {
		try{
			Session session = getSession();
			Criteria vehicleModelCriteria = session
					.createCriteria(VehicleModel.class, "vehicleModel")
					.createAlias("vehicleManufacturer", "manufacturer");

			List<Integer> manufacturerIds = params.getManufacturerIds();
			if (manufacturerIds != null && !manufacturerIds.isEmpty()) {
				vehicleModelCriteria.add(Restrictions.in("manufacturer.id", manufacturerIds));
			}

			return (ArrayList<VehicleModel>) vehicleModelCriteria.list();

		}catch (Exception ex){
			logger.error("search failed. params: " + JsonHelper.toJson(params), ex);
			throw ex;
		}
	}

}
