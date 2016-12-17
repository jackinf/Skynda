package me.skynda.classification.dao;

import me.skynda.classification.entities.Classification;
import me.skynda.classification.enums.ClassificationTypeEnum;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.interfaces.daos.ClassificationDao;
import me.skynda.vehicle.entities.VehicleModel;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ClassificationDaoImpl extends SkyndaBaseEntityDaoImpl<Classification> implements ClassificationDao {

    private final String CLASSIFIER_REF_NAME_CLASSIFICATION_TYPE = "classificationType";
    private final String CLASSIFIER_REF_NAME_TRANSMISSION = "transmission";
    private final String CLASSIFIER_REF_NAME_DRIVETRAIN = "drivetrain";
    private final String CLASSIFIER_REF_NAME_VEHICLE_MANUFACTURER = "vehicleManufacturer";
    private final String CLASSIFIER_REF_NAME_FUEL_TYPE = "fuelType";it
    private final String CLASSIFIER_REF_NAME_VEHICLE_BODY = "vehicleBody";

    @Override
    public ArrayList<Classification> getByType(String type) {
        Criteria classificationCriteria = getSession()
            .createCriteria(Classification.class, "с1")
            .createCriteria(CLASSIFIER_REF_NAME_CLASSIFICATION_TYPE, "с");

        classificationCriteria.add(Restrictions.eq("с.name", type));
        List list = classificationCriteria.list();
        return (ArrayList<Classification>) list;
    }

    @Override
    public List getByTypeAndVehicleBound(String type) {
        if (ClassificationTypeEnum.TRANSMISSION.getName().equals(type)) {
            ArrayList<Integer> boundIds = getBoundClassifiersToVehicleModel(CLASSIFIER_REF_NAME_TRANSMISSION);
            return filterClassifications(getByType(type), boundIds);
        }

        else if (ClassificationTypeEnum.FEATURE.getName().equals(type)) {
            return getByType(type);
        }

        else if (ClassificationTypeEnum.PAYMENT_TYPE.getName().equals(type)) {
            return getByType(type);
        }

        else if (ClassificationTypeEnum.DRIVETRAIN.getName().equals(type)) {
            ArrayList<Integer> boundIds = getBoundClassifiersToVehicleModel(CLASSIFIER_REF_NAME_DRIVETRAIN);
            return filterClassifications(getByType(type), boundIds);
        }

        else if (ClassificationTypeEnum.PAYMENT_STATUS.getName().equals(type)) {
            return getByType(type);
        }

        else if (ClassificationTypeEnum.MANUFACTURER.getName().equals(type)) {
            ArrayList<Integer> boundIds = getBoundClassifiersToVehicleModel(CLASSIFIER_REF_NAME_VEHICLE_MANUFACTURER);
            return filterClassifications(getByType(type), boundIds);
        }

        else if (ClassificationTypeEnum.COLOR.getName().equals(type)) {
            return getByType(type);
        }

        else if (ClassificationTypeEnum.FUEL.getName().equals(type)) {
            ArrayList<Integer> boundIds = getBoundClassifiersToVehicleModel(CLASSIFIER_REF_NAME_FUEL_TYPE);
            return filterClassifications(getByType(type), boundIds);
        }

        else if (ClassificationTypeEnum.VEHICLE_BODY.getName().equals(type)) {
            ArrayList<Integer> boundIds = getBoundClassifiersToVehicleModel(CLASSIFIER_REF_NAME_VEHICLE_BODY);
            return filterClassifications(getByType(type), boundIds);
        }

        return getByType(type);
    }

    private ArrayList<Integer> getBoundClassifiersToVehicleModel(String classifierReferenceName) {
        Criteria criteria = getSession().createCriteria(VehicleModel.class, "vehicleModel");
        List transmissionList = criteria
                .createAlias("vehicleModel." + classifierReferenceName, classifierReferenceName)
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
