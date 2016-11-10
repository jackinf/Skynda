package me.skynda.car.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import me.skynda.car.model.CarModel;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;

@Repository
public class CarModelsDaoImpl extends SkyndaBaseEntityDaoImpl<CarModel> implements CarModelsDao{

	@Override
	public CarModel getByModelCode(String carModelsCode) {
		Criteria c = getSession().createCriteria(CarModel.class, "cm");
        c.add(Restrictions.eq("cm.modelCode", carModelsCode));
        return (CarModel) c.uniqueResult();
	}

}
