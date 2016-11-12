package me.skynda.vehicle.dao;

import me.skynda.common.dao.ImageDao;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.vehicle.dto.ImageContainerDto;
import me.skynda.vehicle.dto.ImagesDto;
import me.skynda.common.entity.Image;
import me.skynda.vehicle.entity.Vehicle;
import me.skynda.vehicle.entity.VehicleImage;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class VehicleImageDaoImpl extends SkyndaBaseEntityDaoImpl<VehicleImage> implements VehicleImageDao {

    @Autowired
    private ImageDao imageDao;

    @Override
    public void addMultipleToVehicle(Vehicle vehicle, List<ImagesDto> images) {

        Session session = getSession();
        String id = vehicle.getId().toString();
        session.createSQLQuery("DELETE FROM car_image WHERE vehicle_id = " + id)  // TODO: avoid SQL injection
//                .setParameter("xxx", id)
                .executeUpdate();

        if (images == null)
            return;

        for (ImagesDto image : images) {
            VehicleImage vehicleImage = new VehicleImage();
            vehicleImage.setVehicle(vehicle);

            if (image.getImageContainer() != null) {
                ImageContainerDto imageContainerDto = image.getImageContainer();
                Image imageEntity = imageDao.save(Image.Factory.create(
                    imageContainerDto.getImageUrl(),
                    imageContainerDto.getBlobName(),
                    imageContainerDto.getContainerName())
                );
                vehicleImage.setImage(imageEntity);
            }
//            vehicleImage.setImageUrl(image.getThumbnail());   // TODO?
            session.save(vehicleImage);
        }
    }
}
