package me.skynda.vehicle.dao.VehicleModelDao;

import me.skynda.vehicle.entity.VehicleModel;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;

@Repository
public class VehicleModelDaoImpl extends SkyndaBaseEntityDaoImpl<VehicleModel> implements VehicleModelDao {

	@Override
	public VehicleModel getByModelCode(String carModelsCode) {
		Criteria c = getSession().createCriteria(VehicleModel.class, "cm");
        c.add(Restrictions.eq("cm.modelCode", carModelsCode));
        return (VehicleModel) c.uniqueResult();
	}

}
