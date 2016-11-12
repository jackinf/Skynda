package me.skynda.vehicle.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;

@Repository
public class VehicleManufacturerDaoImpl extends SkyndaBaseEntityDaoImpl<VehicleManufacturer> implements VehicleManufacturerDao {

	@Override
	public VehicleManufacturer getByManufacturerCode(String carManufacturerCode) {
		Criteria c = getSession().createCriteria(VehicleManufacturer.class, "cm");
        c.add(Restrictions.eq("cm.manufacturerCode", carManufacturerCode));
        return (VehicleManufacturer) c.uniqueResult();
	}
	
}
