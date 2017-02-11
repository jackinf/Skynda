package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.common.entities.Feature;

import java.util.List;

public interface IFeatureDao extends SkyndaBaseEntityDao<Feature>{
    List<Feature> getAll(Boolean isActive);
    List<Feature> getAll();
}
