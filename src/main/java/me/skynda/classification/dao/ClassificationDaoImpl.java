package me.skynda.classification.dao;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.classification.entities.Classification;
import me.skynda.common.interfaces.daos.ClassificationDao;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

@Repository
public class ClassificationDaoImpl extends SkyndaBaseEntityDaoImpl<Classification> implements ClassificationDao {

    @Override
    public Classification getManufacturer(String vehicleManufacturerCode) {
        Criteria c = getSession().createCriteria(Classification.class, "с");
        c.add(Restrictions.eq("с.value", vehicleManufacturerCode));
        c.add(Restrictions.eq("с.classification_type_id", 6));  // TODO: Use enum and/or classifier_type table (JOIN)
        return (Classification) c.uniqueResult();
    }

}
