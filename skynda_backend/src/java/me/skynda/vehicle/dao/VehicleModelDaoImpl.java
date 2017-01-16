package me.skynda.vehicle.dao;

import me.skynda.common.interfaces.daos.VehicleModelDao;
import me.skynda.vehicle.entities.VehicleModel;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import me.skynda.common.db.BaseEntityDaoImpl;

@Repository
public class VehicleModelDaoImpl extends BaseEntityDaoImpl<VehicleModel> implements VehicleModelDao {

	@Override
	public VehicleModel getByModelCode(String carModelsCode) {
		Criteria c = getSession().createCriteria(VehicleModel.class, "cm");
        c.add(Restrictions.eq("cm.modelCode", carModelsCode));
        return (VehicleModel) c.uniqueResult();
	}

}
