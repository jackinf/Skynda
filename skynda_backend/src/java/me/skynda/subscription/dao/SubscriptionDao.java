package me.skynda.subscription.dao;

import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.ISubscriptionDao;
import me.skynda.subscription.entities.Subscription;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class SubscriptionDao extends BaseEntityDao<Subscription> implements ISubscriptionDao {

    private static Logger logger = LoggerFactory.getLogger(SubscriptionDao.class);

    @Override
    public Subscription getByEmail(String email) {
        try {
            Session session = getSession();

            Criteria criteria = session
                    .createCriteria(Subscription.class)
                    .add(Restrictions.eq("email", email));
            return (Subscription) criteria.uniqueResult();
        } catch (Exception e) {
            logger.error("sendEmail failed. email: " + email, e);
            throw e;
        }
    }
}
