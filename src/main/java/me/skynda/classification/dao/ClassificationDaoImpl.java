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
        Criteria classifierTypeCriteria = getSession().createCriteria(ClassificationType.class, "с");
        classifierTypeCriteria.add(Restrictions.eq("с.name", type));
        ClassificationType classificationType = (ClassificationType) classifierTypeCriteria.uniqueResult();
        Integer classificationTypeId = classificationType.getId();

        Criteria classifierCriteria = getSession().createCriteria(Classification.class, "с1");
        classifierCriteria.add(Restrictions.eq("с1.classificationType.id", classificationTypeId));
        List list = classifierCriteria.list();
        return (ArrayList<Classification>) list;
    }

}
