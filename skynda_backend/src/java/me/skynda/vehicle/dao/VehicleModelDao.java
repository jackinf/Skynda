package me.skynda.vehicle.dao;

import me.skynda.common.interfaces.daos.IVehicleModelDao;
import me.skynda.common.entities.VehicleModel;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import me.skynda.common.db.BaseEntityDao;

@Repository
public class VehicleModelDao extends BaseEntityDao<VehicleModel> implements IVehicleModelDao {

	@Override
	public VehicleModel getByModelCode(String carModelsCode) {
		Criteria c = getSession().createCriteria(VehicleModel.class, "cm");
        c.add(Restrictions.eq("cm.modelCode", carModelsCode));
        return (VehicleModel) c.uniqueResult();
	}

}
