package me.skynda.classification.dao;

import me.skynda.classification.entities.ClassificationType;
import me.skynda.classification.enums.ClassificationTypeEnum;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.classification.entities.Classification;
import me.skynda.common.interfaces.daos.ClassificationDao;
import me.skynda.vehicle.entities.VehicleModel;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Repository
public class ClassificationDaoImpl extends SkyndaBaseEntityDaoImpl<Classification> implements ClassificationDao {

    @Override
    public ArrayList<Classification> getByType(String type) {
        Criteria classificationCriteria = getSession()
            .createCriteria(Classification.class, "с1")
            .createCriteria("classificationType", "с");

        classificationCriteria.add(Restrictions.eq("с.name", type));
        List list = classificationCriteria.list();
        return (ArrayList<Classification>) list;
    }

    @Override
    public List getByTypeAndVehicleBound(String type) {
        String sql;

        if (ClassificationTypeEnum.TRANSMISSION.getName().equals(type)) {

            ArrayList<Classification> all = getByType(type);
            ArrayList<Integer> boundIds = getBoundClassifiersToVehicleModel("transmission");
            return filterClassifications(all, boundIds);

//            Criteria cr = getSession().createCriteria(Classification.class, "classification")
//                    .createAlias("classification.id", "id", Criteria.INNER_JOIN)
//                    .createAlias("classification.statuses", "status", Criteria.LEFT_JOIN);
//            cr.add(Restrictions.or(
//                    Restrictions.eq("role.roletype", 1),
//                    Restrictions.and(
//                            Restrictions.eq("role.roletype", 2),
//                            Restrictions.eq("status.statusType", 1))));

//            Integer value = ClassificationTypeEnum.TRANSMISSION.getValue();
//
//            sql = "SELECT c.* FROM classification c JOIN vehicle_model v ON c.id = v.transmission_id" +
//                    " WHERE classification_type_id = " + value + " GROUP BY c.id ";
        } else if (ClassificationTypeEnum.FEATURE.getName().equals(type)) {
            return getByType(type);
        } else if (ClassificationTypeEnum.PAYMENT_TYPE.getName().equals(type)) {
            return getByType(type);
        } else if (ClassificationTypeEnum.DRIVETRAIN.getName().equals(type)) {
            Integer value = ClassificationTypeEnum.DRIVETRAIN.getValue();

            sql = "SELECT c.* FROM classification c JOIN vehicle_model v ON c.id = v.drivetrain_id" +
                    " WHERE classification_type_id = " + value + " GROUP BY c.id ";
        } else if (ClassificationTypeEnum.PAYMENT_STATUS.getName().equals(type)) {
            return getByType(type);
        } else if (ClassificationTypeEnum.MANUFACTURER.getName().equals(type)) {
            Integer value = ClassificationTypeEnum.MANUFACTURER.getValue();

            sql = "SELECT c.* FROM classification c JOIN vehicle_model v ON c.id = v.vehicle_manufacturer_id" +
                    " WHERE classification_type_id = " + value + " GROUP BY c.id ";
        } else if (ClassificationTypeEnum.COLOR.getName().equals(type)) {
            return getByType(type);
        } else if (ClassificationTypeEnum.FUEL.getName().equals(type)) {
            Integer value = ClassificationTypeEnum.DRIVETRAIN.getValue();

            sql = "SELECT c.* FROM classification c JOIN vehicle_model v ON c.id = v.fuel_type_id" +
                    " WHERE classification_type_id = " + value + " GROUP BY c.id ";
        } else if (ClassificationTypeEnum.VEHICLE_BODY.getName().equals(type)) {
            Integer value = ClassificationTypeEnum.DRIVETRAIN.getValue();

            sql = "SELECT c.* FROM classification c JOIN vehicle_model v ON c.id = v.vehicle_body_id" +
                    " WHERE classification_type_id = " + value + " GROUP BY c.id ";
        } else {
            return getByType(type);
        }

        SQLQuery query = getSession().createSQLQuery(sql);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List list = query.list();
        ArrayList<Classification> classificationArrayList = (ArrayList<Classification>) list;

        return classificationArrayList;
    }

    private ArrayList<Integer> getBoundClassifiersToVehicleModel(String classifierReferenceName) {
        Criteria criteria = getSession().createCriteria(VehicleModel.class, classifierReferenceName);
        List transmissionList = criteria
                .createAlias("vehicleModel.transmission", classifierReferenceName)
                .setProjection(Projections.projectionList()
                        .add(Projections.groupProperty(classifierReferenceName + ".id")))
                .list();
        return (ArrayList<Integer>) transmissionList;
    }

    private List<Classification> filterClassifications(ArrayList<Classification> all, ArrayList<Integer> boundIds) {
        return all.stream().filter(classification -> {
                    for (Integer id : boundIds) {
                        if (classification.getId().equals(id)) {
                            return true;
                        }
                    }
                    return false;
                }).collect(Collectors.toList());
    }

}
