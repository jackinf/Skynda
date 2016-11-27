package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.classification.entities.Classification;

import java.util.List;

public interface ClassificationDao extends SkyndaBaseEntityDao<Classification> {
    List getByType(String type);
}
