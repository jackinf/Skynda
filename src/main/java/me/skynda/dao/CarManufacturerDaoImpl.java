package me.skynda.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.model.CarManufacturer;

@Repository
public class CarManufacturerDaoImpl extends SkyndaBaseEntityDaoImpl<CarManufacturer> implements CarManufacturerDao{

	@Override
	public CarManufacturer getByManufacturerCode(String carManufacturerCode) {
		Criteria c = getSession().createCriteria(CarManufacturer.class, "cm");
        c.add(Restrictions.eq("cm.manufacturerCode", carManufacturerCode));
        return (CarManufacturer) c.uniqueResult();
	}
	
}
