package me.skynda.car.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import me.skynda.car.model.CarManufacturer;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;

@Repository
public class CarManufacturerDaoImpl extends SkyndaBaseEntityDaoImpl<CarManufacturer> implements CarManufacturerDao{

	@Override
	public CarManufacturer getByManufacturerCode(String carManufacturerCode) {
		Criteria c = getSession().createCriteria(CarManufacturer.class, "cm");
        c.add(Restrictions.eq("cm.manufacturerCode", carManufacturerCode));
        return (CarManufacturer) c.uniqueResult();
	}
	
}
