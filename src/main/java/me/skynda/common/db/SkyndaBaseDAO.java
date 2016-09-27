package me.skynda.common.db;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Base DAO implementation for SKYNDA backend projects.
 */
public abstract class SkyndaBaseDAO {

    @Autowired
    private SessionFactory sessionFactory;

    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    public String getNextUuid() {
        return "" + getSession().createSQLQuery("select nextval('uuid_seq')").uniqueResult();
    }

}
