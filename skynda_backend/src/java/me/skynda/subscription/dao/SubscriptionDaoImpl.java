package me.skynda.subscription.dao;

import me.skynda.common.db.BaseEntityDaoImpl;
import me.skynda.common.interfaces.daos.SubscriptionDao;
import me.skynda.subscription.entities.Subscription;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

@Repository
public class SubscriptionDaoImpl extends BaseEntityDaoImpl<Subscription> implements SubscriptionDao {

    @Override
    public Subscription getByEmail(String email) {

        Session session = getSession();

        Criteria criteria = session
                .createCriteria(Subscription.class)
                .add(Restrictions.eq("email", email));
        Subscription subscription = (Subscription) criteria.uniqueResult();
        return  subscription;
    }
}
