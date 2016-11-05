package me.skynda.auth.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import me.skynda.auth.model.User;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;

@Repository
public class UserDaoImpl extends SkyndaBaseEntityDaoImpl<UserDao> implements UserDao{

	@Override
	public User getByEmail(String email) {
		Criteria c = getSession().createCriteria(User.class, "us");
	    c.add(Restrictions.eq("us.email", email));
	    return (User) c.uniqueResult();
	}
	
}
