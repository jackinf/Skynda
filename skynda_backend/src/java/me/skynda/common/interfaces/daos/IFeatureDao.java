package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.entities.Feature;

import java.io.Serializable;
import java.util.List;

public interface IFeatureDao extends SkyndaBaseEntityDao<Feature>{
    List<Feature> getAll(Boolean isActive);
    List<Feature> getAll();
    void deleteEntity(Feature feature, DeleteResponseDto response);
    Feature get(Serializable id, Boolean isActive);
    Feature get(Serializable id);
    Feature saveOrUpdate(Feature feature);
    List<Feature> getAllBy(Serializable vehicleId);
    List<Feature> getAllBy(Serializable vehicleId, Boolean isActive);
}
