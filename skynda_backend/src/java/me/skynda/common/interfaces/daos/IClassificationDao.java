package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.common.entities.Classification;

import java.util.List;

public interface IClassificationDao extends SkyndaBaseEntityDao<Classification> {
    List getByType(String type);
    List getByTypeAndVehicleBound(String type);
}
