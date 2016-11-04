package me.skynda.car.dao;

import me.skynda.car.dto.ImageContainerDto;
import me.skynda.car.dto.ImagesDto;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarImage;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.helper.SkyndaUtility;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CarImageDaoImpl extends SkyndaBaseEntityDaoImpl<CarImage> implements CarImageDao {

    @Override
    public void addMultipleToCar(Car car, List<ImagesDto> images) {

        Session session = getSession();
        String id = car.getId().toString();
        session.createSQLQuery("DELETE FROM car_image WHERE cars_for_sale_id = " + id)  // TODO: avoid SQL injection
//                .setParameter("xxx", id)
                .executeUpdate();

        if (images == null)
            return;

        for (ImagesDto image : images) {
            CarImage carImage = new CarImage();
            carImage.setCar(car);

            Optional<ImageContainerDto> resolve = SkyndaUtility.resolve(() -> image.getImageContainer());
            if (resolve != null) {
                ImageContainerDto imageContainerDto = resolve.get();
                carImage.setImageUrl(imageContainerDto.getImageUrl());
                carImage.setImageBlobName(imageContainerDto.getBlobName());
                carImage.setImageContainerName(imageContainerDto.getContainerName());
            }
//            carImage.setImageUrl(image.getThumbnail());   // TODO?
            session.save(carImage);
        }
    }
}
