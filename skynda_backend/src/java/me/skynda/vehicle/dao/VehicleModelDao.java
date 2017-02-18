package me.skynda.vehicle.dao;

import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.IVehicleModelDao;
import me.skynda.common.entities.VehicleModel;
import me.skynda.vehicle.dto.request.VehicleModelSearchRequest;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import me.skynda.common.db.BaseEntityDao;

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
