package me.skynda.feature.dao;

import me.skynda.classification.dao.ClassificationDao;
import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.entities.Feature;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.IFeatureDao;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.net.InetAddress;
import java.util.Date;
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

    @Override
    public void deleteEntity(Feature feature, DeleteResponseDto response) {
        Transaction tx = null;
        Session session = getSession();
        Date now = new Date();
        try {
            tx = session.beginTransaction();
            int queryResponse = session
                    .createQuery(
                            "UPDATE Feature " +
                                    "SET archived = :archived " +
                                    "WHERE id = :id")
                    .setParameter("archived", now)
                    .setParameter("id", feature.getId())

                    .executeUpdate();

            if (queryResponse < 1) {
                Exception exception = new Exception("Vehicle Report Item Delete failed: No such item found.");
                logger.error("deleteEntity failed. review: " + JsonHelper.toJson(feature), exception);
                throw exception;
            }

            tx.commit();
            response.setSuccess(true);

        } catch (Exception e) {
            e.printStackTrace();
            response.setError(e.getMessage());
            response.setSuccess(false);
            if(tx != null) tx.rollback();
        }
    }

    @Override
    public Feature get(Serializable id) {
        return get(id, true);
    }

    @Override
    public Feature get(Serializable id, Boolean isActive) {
        Session session = getSession();
        Feature queryResponse = null;
        try {

            Criteria featureCriteria = session
                    .createCriteria(Feature.class, "feature");

            featureCriteria.add(Restrictions.eq("id", id));

            if(isActive){
                featureCriteria.add(Restrictions.isNull("archived"));
            }

            queryResponse = (Feature) featureCriteria.uniqueResult();

        } catch (Exception e) {
            logger.error("get failed. id: " + id + ", isActive: " + isActive, e);
            e.printStackTrace();
        }

        return queryResponse;
    }

    @Override
    public List getAllBy(Serializable vehicleId) {
        return getAllBy(vehicleId, true);
    }

    @Override
    public List getAllBy(Serializable vehicleId, Boolean isActive) {
        Session session = getSession();
        try {

            Criteria featureCriteria = session
                    .createCriteria(Feature.class, "feature")
                    .add(Restrictions.eq("vehicleId", vehicleId));

            if(isActive){
                featureCriteria.add(Restrictions.isNull("archived"));
            }

            List<Feature> queryResponse = featureCriteria.list();

            return queryResponse;

        } catch (Exception e) {
            logger.error("getAllBy failed. vehicleId: " + vehicleId + " isActive: " + isActive, e);
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public Feature saveOrUpdate(Feature feature) {
        Transaction tx = null;
        Session session = getSession();
        try {
            tx = session.beginTransaction();
            feature.setModifierUserId(1);
            feature.setModifierUserIp(InetAddress.getLocalHost().getHostAddress());

            if (feature.getId() == null) {
                session.save(feature);
            } else {
                Feature existingItem =
                        (Feature) session.createQuery("SELECT item FROM Feature as item " +
                                "WHERE item.id = :id AND item.archived IS NULL")
                                .setParameter("id", feature.getId())
                                .uniqueResult();

                if (existingItem == null) {
                    throw new Exception("Vehicle Report Item is null");
                }

                existingItem.setName(feature.getName());
                existingItem.setValue(feature.getValue());
                existingItem.setDescription(feature.getDescription());
                existingItem.setWeight(feature.getWeight());
                existingItem.setIsActive(feature.getIsActive());
                existingItem.setIsImported(feature.getIsImported());

                session.update(existingItem);
                feature = existingItem;
            }

            tx.commit();
        } catch (Exception e) {
            if(tx != null)
                tx.rollback();
            logger.error("saveOrUpdate failed. vehicleReview: " + JsonHelper.toJson(feature), e);
            e.printStackTrace();
        }

        return feature;
    }
}
