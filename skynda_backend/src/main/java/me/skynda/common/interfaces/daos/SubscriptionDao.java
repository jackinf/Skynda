package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.subscription.entities.Subscription;

public interface SubscriptionDao extends SkyndaBaseEntityDao<Subscription> {
    Subscription getByEmail(String email);
}
