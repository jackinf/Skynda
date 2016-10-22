package me.skynda.common.db;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Base data access object implementation for SKYNDA backend project.
 */
public abstract class SkyndaBaseDAO {

    /**
     * Session creator object.
     */
	@Autowired
	private SessionFactory sessionFactory;

    /**
     * Gets database session
     * @return Hibernate's session
     */
    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    /**
     * Id generator based on existing database id's.
     * @return new id.
     */
    public String getNextUuid() {
        return "" + getSession().createSQLQuery("select nextval('uuid_seq')").uniqueResult();
    }

}
