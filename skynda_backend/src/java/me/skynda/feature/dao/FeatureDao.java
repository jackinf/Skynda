package me.skynda.feature.dao;

import me.skynda.classification.dao.ClassificationDao;
import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.entities.Feature;
import me.skynda.common.interfaces.daos.IFeatureDao;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FeatureDao extends BaseEntityDao<Feature> implements IFeatureDao{
    private static Logger logger = LoggerFactory.getLogger(ClassificationDao.class);

    @Override
    public List<Feature> getAll() {
        return getAll(true);
    }

    @Override
    public List<Feature> getAll(Boolean isActive) {
        Session session = getSession();
        try {

            Criteria featureCriteria = session
                    .createCriteria(Feature.class, "feature");

            if(isActive){
                featureCriteria.add(Restrictions.isNull("archived"));
            }

            List<Feature> queryResponse = featureCriteria.list();

            return queryResponse;

        } catch (Exception e) {
            logger.error("getAll failed. isActive: " + isActive, e);
            e.printStackTrace();
        }

        return null;
    }
}
