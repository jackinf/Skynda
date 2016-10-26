package me.skynda.car.dao;

import me.skynda.car.dto.ImagesDto;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarImage;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CarImageDaoImpl extends SkyndaBaseEntityDaoImpl<CarImage> implements CarImageDao {

    @Override
    public void addMultipleToCar(Car car, List<ImagesDto> images) {

        Session session = getSession();
        session.createSQLQuery("DELETE FROM car_image WHERE cars_for_sale.id = :carId")
                .setLong("carId", car.getId())
                .executeUpdate();

        for (ImagesDto image : images) {
            CarImage carImage = new CarImage();
            carImage.setCar(car);
            carImage.setImageUrl(image.getOriginal());
//            carImage.setImageUrl(image.getThumbnail());
            session.save(carImage);
        }
        session.close();
    }
}
