package me.skynda.classification.dao;

import me.skynda.classification.entities.ClassificationType;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.classification.entities.Classification;
import me.skynda.common.interfaces.daos.ClassificationDao;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ClassificationDaoImpl extends SkyndaBaseEntityDaoImpl<Classification> implements ClassificationDao {

    @Override
    public ArrayList<Classification> getByType(String type) {
        Criteria classificationCriteria = getSession()
            .createCriteria(Classification.class, "с1")
            .createCriteria("classificationType", "с");

        classificationCriteria.add(Restrictions.eq("с.name", type));
        List list = classificationCriteria.list();
        return (ArrayList<Classification>) list;
    }

}
