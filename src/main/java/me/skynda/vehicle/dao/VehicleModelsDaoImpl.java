package me.skynda.vehicle.dao;

import me.skynda.vehicle.entity.VehicleModel;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;

@Repository
public class VehicleModelsDaoImpl extends SkyndaBaseEntityDaoImpl<VehicleModel> implements VehicleModelsDao {

	@Override
	public VehicleModel getByModelCode(String carModelsCode) {
		Criteria c = getSession().createCriteria(VehicleModel.class, "cm");
        c.add(Restrictions.eq("cm.modelCode", carModelsCode));
        return (VehicleModel) c.uniqueResult();
	}

}
