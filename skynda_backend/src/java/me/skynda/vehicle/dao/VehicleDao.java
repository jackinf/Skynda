package me.skynda.vehicle.dao;

import com.sun.org.apache.xpath.internal.operations.Bool;
import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.helper.CastHelper;
import me.skynda.common.interfaces.daos.IVehicleDao;
import me.skynda.common.interfaces.daos.IVehicleReportDao;
import me.skynda.common.interfaces.daos.IVehicleReportItemDao;
import me.skynda.vehicle.dto.request.SearchRequestDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleReport;
import org.apache.commons.lang3.NotImplementedException;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class VehicleDao extends BaseEntityDao<Vehicle> implements IVehicleDao {

    private final IVehicleReportDao reportDao;

    @Autowired
    public VehicleDao(IVehicleReportDao reportDao) {
        this.reportDao = reportDao;
    }

    @Override
    public Vehicle get(Serializable id) {
        return get(id, true);
    }

    @Override
    public Vehicle get(Serializable id, Boolean isActive) {
        Session session = getSession();
        Vehicle queryResponse = null;
        List reports = null;

        try {

            Criteria vehicleCriteria = session
                    .createCriteria(Vehicle.class, "vehicle");

            vehicleCriteria.add(Restrictions.eq("id", id));

            if(isActive){
                vehicleCriteria.add(Restrictions.isNull("archived"));
                reports = reportDao.getAllBy(id);
            }

            queryResponse = (Vehicle) vehicleCriteria.uniqueResult();

            if(queryResponse != null && isActive){
                queryResponse.setReportCategories(reports);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return queryResponse;
    }

    @Override
    public List<Vehicle> search(SearchRequestDto params) {
        try{
            Session session = getSession();
            Criteria vehicleCriteria = session
                    .createCriteria(Vehicle.class, "vehicle")
                    .createAlias("model", "model");

            ////Manufacturer code / Brand
            if (params.Brands != null && !params.Brands.isEmpty()) {
                Collection<Integer> brandList = params.Brands.stream()
                        .map(x -> x.getValue())
                        .collect(Collectors.toCollection(ArrayList::new));
                vehicleCriteria.createAlias("vehicle.model.vehicleManufacturer", "manufacturer");
                vehicleCriteria.add(Restrictions.in("manufacturer.id", brandList));
            }
            // TODO: Color outside search
//            ////Vehicle outside color
//            if (params.Colors != null && !params.Colors.isEmpty()) {
//                Collection<Integer> colorList = params.Colors.stream()
//                        .map(x -> x.getValue())
//                        .collect(Collectors.toCollection(ArrayList::new));
//                vehicleCriteria.createAlias("vehicle.colorOutsideHex", "color");
//                vehicleCriteria.add(Restrictions.in("color.id", colorList));
//            }
            ////Vehicle feature
            if (params.Features != null && !params.Features.isEmpty()) {
                Collection<Integer> featureList = params.Features.stream()
                        .map(x -> x.getValue())
                        .collect(Collectors.toCollection(ArrayList::new));
                vehicleCriteria.createAlias("vehicle.features", "vehicleFeature");
                vehicleCriteria.add(Restrictions.in("vehicleFeature.feature.id", featureList));
            }
            ////Doors
            if (params.Doors != null && !params.Doors.isEmpty()) {
                ArrayList<Integer> doorValues = params.Doors.stream()
                                .map(x -> x.getValue())
                                .collect(Collectors.toCollection(ArrayList::new));
                Integer doors = Collections.min(doorValues);
                vehicleCriteria.add(Restrictions.ge("model.doors", doors));
            }

            if (params.Seats != null && !params.Seats.isEmpty()) {
                ArrayList<Integer> seatValues = params.Seats.stream()
                        .map(x -> x.getValue())
                        .collect(Collectors.toCollection(ArrayList::new));
                Integer seats = Collections.min(seatValues);
                vehicleCriteria.add(Restrictions.ge("model.seats", seats));
            }
            ////Transmission type(classification)
            if (params.Transmission != null && !params.Transmission.isEmpty()) {
                Collection<Integer> transmissionList = params.Transmission.stream()
                        .map(x -> x.getValue())
                        .collect(Collectors.toCollection(ArrayList::new));
                vehicleCriteria.createAlias("vehicle.model.transmission", "transmission");
                vehicleCriteria.add(Restrictions.in("transmission.id", transmissionList));
            }

            if (params.Mileage != null) {
            BigDecimal[] values = CastHelper.AttributesToBigDecimal(params.Mileage);
                Criterion conjunction = Restrictions.conjunction()
                        .add(Restrictions.ge("vehicle.mileage", values[0]))
                        .add(Restrictions.le("vehicle.mileage", values[1]));
                vehicleCriteria.add(conjunction);
            }

            if (params.Price != null) {
                BigDecimal[] values = CastHelper.AttributesToBigDecimal(params.Price);
                Criterion conjunction = Restrictions.conjunction()
                        .add(Restrictions.ge("vehicle.price", values[0]))
                        .add(Restrictions.le("vehicle.price", values[1]));
                vehicleCriteria.add(conjunction);
            }

            if (params.Year != null) {
                Criterion conjunction = Restrictions.conjunction()
                        .add(Restrictions.ge("model.year", params.Year.getMin().intValue()))
                        .add(Restrictions.le("model.year", params.Year.getMax().intValue())) ;
                vehicleCriteria.add(conjunction);
            }

            if (params.PetrolConsumption != null) {
                BigDecimal[] values = CastHelper.AttributesToBigDecimal(params.PetrolConsumption);

                Criterion disjunctionMin = Restrictions.disjunction()
                        .add(Restrictions.ge("vehicle.fuelCity", values[0]))
                        .add(Restrictions.ge("vehicle.fuelHighway", values[0]));

                Criterion disjunctionMax = Restrictions.disjunction()
                        .add(Restrictions.le("vehicle.fuelCity", values[1]))
                        .add(Restrictions.le("vehicle.fuelHighway", values[1]));

                Criterion petrolCriterion = Restrictions.conjunction()
                        .add(disjunctionMin)
                        .add(disjunctionMax);
                vehicleCriteria.add(petrolCriterion);
            }

            if (params.Power != null) {
                Criterion conjunction = Restrictions.conjunction()
                        .add(Restrictions.ge("model.horsePower", params.getPower().getMin().intValue()))
                        .add(Restrictions.le("model.horsePower", params.getPower().getMax().intValue())) ;
                vehicleCriteria.add(conjunction);
            }

            List<Vehicle>  result = (ArrayList<Vehicle>) vehicleCriteria.list();

            return result;

        }catch (Exception ex){
            throw new NotImplementedException("search() is corrupted", ex.getMessage());
        }
    }
}


