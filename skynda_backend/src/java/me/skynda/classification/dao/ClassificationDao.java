package me.skynda.classification.dao;

import me.skynda.blobstorage.service.BlobStorageService;
import me.skynda.classification.entities.Classification;
import me.skynda.classification.enums.ClassificationTypeEnum;
import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.IClassificationDao;
import me.skynda.vehicle.entities.VehicleModel;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ClassificationDao extends BaseEntityDao<Classification> implements IClassificationDao {

    private final String CLASSIFIER_REF_NAME_CLASSIFICATION_TYPE = "classificationType";
    private final String CLASSIFIER_REF_NAME_TRANSMISSION = "transmission";
    private final String CLASSIFIER_REF_NAME_DRIVETRAIN = "drivetrain";
    private final String CLASSIFIER_REF_NAME_VEHICLE_MANUFACTURER = "vehicleManufacturer";
    private final String CLASSIFIER_REF_NAME_FUEL_TYPE = "fuelType";
    private final String CLASSIFIER_REF_NAME_VEHICLE_BODY = "vehicleBody";

    private static Logger logger = LoggerFactory.getLogger(ClassificationDao.class);

    @Override
    public ArrayList<Classification> getByType(String type) {
        try {
            Criteria classificationCriteria = getSession()
                    .createCriteria(Classification.class, "с1")
                    .createCriteria(CLASSIFIER_REF_NAME_CLASSIFICATION_TYPE, "с");

            classificationCriteria.add(Restrictions.eq("с.name", type));
            List list = classificationCriteria.list();
            return (ArrayList<Classification>) list;
        } catch (Exception e) {
            logger.error("getByType failed. type: " + type, e);
            throw e;
        }
    }

    @Override
    public List getByTypeAndVehicleBound(String type) {
        try {
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
        } catch (Exception e) {
            logger.error("getByTypeAndVehicleBound failed. type: " + type, e);
            throw e;
        }
    }

    private ArrayList<Integer> getBoundClassifiersToVehicleModel(String classifierReferenceName) {
        try {
            Criteria criteria = getSession().createCriteria(VehicleModel.class, "vehicleModel");
            List transmissionList = criteria
                    .createAlias("vehicleModel." + classifierReferenceName, classifierReferenceName)
                    .setProjection(Projections.projectionList()
                            .add(Projections.groupProperty(classifierReferenceName + ".id")))
                    .list();
            return (ArrayList<Integer>) transmissionList;
        } catch (Exception e) {
            logger.error("getBoundClassifiersToVehicleModel failed. classifierReferenceName: " + classifierReferenceName, e);
            throw e;
        }
    }

    private List<Classification> filterClassifications(ArrayList<Classification> all, ArrayList<Integer> boundIds) {
        try {
            return all.stream().filter(classification -> {
                for (Integer id : boundIds) {
                    if (classification.getId().equals(id)) {
                        return true;
                    }
                }
                return false;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("filterClassifications failed. all: " + JsonHelper.toJson(all) + ", boundIds: " + JsonHelper.toJson(boundIds), e);
            throw e;
        }
    }

}
