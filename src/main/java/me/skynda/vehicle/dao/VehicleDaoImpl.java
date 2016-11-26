package me.skynda.vehicle.dao;

import me.skynda.classification.dto.ButtonAttributesDto;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.interfaces.daos.VehicleDao;
import me.skynda.vehicle.dto.request.SearchRequestDto;
import me.skynda.vehicle.entities.Vehicle;
import org.apache.commons.lang3.NotImplementedException;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class VehicleDaoImpl extends SkyndaBaseEntityDaoImpl<Vehicle> implements VehicleDao {

    @Override
    public List<Vehicle> search(SearchRequestDto params) {


        try{
            Session session = getSession();
            Criteria vehicleCriteria = session
                    .createCriteria(Vehicle.class, "vehicle")
                    .createAlias("model", "model");

            ///Manufacturer code / Brand
//            if (params.Brands != null && !params.Brands.isEmpty()) {
//                Collection<Integer> brandList = params.Brands.stream()
//                        .map(x -> x.getValue())
//                        .collect(Collectors.toCollection(ArrayList::new));
//                vehicleCriteria.createAlias("vehicle.model.vehicleManufacturer", "manufacturer");
//                vehicleCriteria.add(Restrictions.in("manufacturer.id", brandList));
//            }

            ///Vehicle outside color
//            if (params.Colors != null && !params.Colors.isEmpty()) {
//                Collection<Integer> colorList = params.Colors.stream()
//                        .map(x -> x.getValue())
//                        .collect(Collectors.toCollection(ArrayList::new));
//                vehicleCriteria.createAlias("vehicle.colorOutside", "color");
//                vehicleCriteria.add(Restrictions.in("color.id", colorList));
//            }

            ///Vehicle feature
//            if (params.Features != null && !params.Features.isEmpty()) {
//                Collection<Integer> featureList = params.Features.stream()
//                        .map(x -> x.getValue())
//                        .collect(Collectors.toCollection(ArrayList::new));
//                vehicleCriteria.createAlias("vehicle.features", "vehicleFeature");
//                vehicleCriteria.add(Restrictions.in("vehicleFeature.feature.id", featureList));
//            }
            if (params.Doors != null) {
                Integer doors = 0;
//                Integer featureList = params.Features.stream()
//                        .map(x -> x.getValue())
//                        .collect(Collectors.toCollection(ArrayList::new));
                vehicleCriteria.createAlias("vehicle.model", "vehicleFeature");
                vehicleCriteria.add(Restrictions.gt("model.doors", doors - 1));
            }


            params.Colors = new ArrayList<ButtonAttributesDto>(){{
                add(new ButtonAttributesDto(){{setValue(35);}});
                add(new ButtonAttributesDto(){{setValue(36);}});
            }};
            List<Vehicle>  result = (ArrayList<Vehicle>) vehicleCriteria.list();

            return result;


//
//            if (params.Seats != null) {
//
//            }
//
//            if (params.Transmission != null) {
//
//            }
//
//            if (params.Mileage != null) {
//
//            }
//
//            if (params.Price != null) {
//
//            }
//
//            if (params.Year != null) {
//
//            }
//
//            if (params.PetrolConsumption != null) {
//
//            }
//
//            if (params.Power != null) {
//
//            }


        }catch (Exception ex){
            throw new NotImplementedException("Otsing on vigane", ex.getMessage());
        }
    }
}
