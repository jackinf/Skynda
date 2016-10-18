package me.skynda.car.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import me.skynda.car.model.CarModels;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;

@Repository
public class CarModelsDaoImpl extends SkyndaBaseEntityDaoImpl<CarModels> implements CarModelsDao{

	@Override
	public CarModels getByModelCode(String carModelsCode) {
		Criteria c = getSession().createCriteria(CarModels.class, "cm");
        c.add(Restrictions.eq("cm.modelCode", carModelsCode));
        return (CarModels) c.uniqueResult();
	}

}
