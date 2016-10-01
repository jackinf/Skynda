package me.skynda.common.db;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

/**
 * Base DAO implementation for SKYNDA backend projects.
 */
public abstract class SkyndaBaseDAO {

    private SessionFactory sessionFactory;

    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public String getNextUuid() {
        return "" + getSession().createSQLQuery("select nextval('uuid_seq')").uniqueResult();
    }

}
