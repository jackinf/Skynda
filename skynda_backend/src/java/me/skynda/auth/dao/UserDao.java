package me.skynda.auth.dao;

import me.skynda.common.interfaces.daos.IUserDao;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import me.skynda.auth.model.User;
import me.skynda.common.db.BaseEntityDao;

@Repository
public class UserDao extends BaseEntityDao<User> implements IUserDao {

	private static Logger logger = LoggerFactory.getLogger(UserDao.class);

	@Override
	public User getByEmail(String email) {
		try {
			Criteria c = getSession().createCriteria(User.class, "us");
			c.add(Restrictions.eq("us.email", email));
			return (User) c.uniqueResult();
		} catch (Exception e) {
			logger.error("getByEmail failed. email: " + email, e);
			throw e;
		}
	}

	@Override
	public User getByLogin(String login) {
		try {
			Criteria c = getSession().createCriteria(User.class, "us");
			c.add(Restrictions.eq("us.login", login));
			return (User) c.uniqueResult();
		} catch (Exception e) {
			logger.error("getByLogin failed. login: " + login, e);
			throw e;
		}
	}
	
}
