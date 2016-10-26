package me.skynda.car.dao;

import me.skynda.car.dto.FeatureDto;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarFeature;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CarFeatureDaoImpl extends SkyndaBaseEntityDaoImpl<CarFeature> implements CarFeatureDao {

    @Override
    public void addMultipleToCar(Car car, List<FeatureDto> features) {

        Session session = getSession();
        session.createSQLQuery("DELETE FROM car_feature WHERE cars_for_sale.id = :carId")
                .setLong("carId", car.getId())
                .executeUpdate();

        for (FeatureDto feature : features) {
            CarFeature carFeature = new CarFeature();
            carFeature.setCar(car);
            carFeature.setText(feature.getText());
            session.save(carFeature);
        }
        session.close();
    }

}
