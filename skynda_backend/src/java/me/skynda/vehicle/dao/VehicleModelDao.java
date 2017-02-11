package me.skynda.vehicle.dao;

import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.IVehicleModelDao;
import me.skynda.common.entities.VehicleModel;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Repository;

import me.skynda.common.db.BaseEntityDao;

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

}
