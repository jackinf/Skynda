package me.skynda.auth.dao;

import me.skynda.auth.model.User;
import me.skynda.common.db.SkyndaBaseEntityDao;

public interface IUserDao extends SkyndaBaseEntityDao<User> {

	User getByEmail(String email);
	
	User getByLogin(String login);

}
