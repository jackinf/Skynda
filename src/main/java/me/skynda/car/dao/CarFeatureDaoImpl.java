package me.skynda.car.dao;

import me.skynda.car.dto.CarDto;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarFeature;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import org.hibernate.Session;

import java.util.List;

public class CarFeatureDaoImpl extends SkyndaBaseEntityDaoImpl<CarFeature> implements CarFeatureDao {

    @Override
    public void addMultipleToCar(Car car, List<CarDto.FeatureDto> features) {

        // TODO: Fix sql injection problems
        Session session = getSession();
        session.createSQLQuery("DELETE FROM car_feature WHERE cars_for_sale.id = " + car.getId()).executeUpdate();
        session.getTransaction().commit();

        for (CarDto.FeatureDto feature : features) {
            CarFeature carFeature = new CarFeature();
            carFeature.setCar(car);
            carFeature.setText(feature.getText());
            session.save(carFeature);
        }
        session.close();
    }

}
