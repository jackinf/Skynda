package me.skynda.auth.dao;

import me.skynda.auth.model.User;
import me.skynda.common.db.SkyndaBaseEntityDao;

public interface UserDao extends SkyndaBaseEntityDao<UserDao> {

	User getByEmail(String email);

}
