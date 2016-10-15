package me.skynda.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.model.CarModels;

@Repository
public class CarModelsDaoImpl extends SkyndaBaseEntityDaoImpl<CarModels> implements CarModelsDao{

	@Override
	public CarModels getByModelCode(String carModelsCode) {
		Criteria c = getSession().createCriteria(CarModels.class, "cm");
        c.add(Restrictions.eq("cm.modelCode", carModelsCode));
        return (CarModels) c.uniqueResult();
	}

}
