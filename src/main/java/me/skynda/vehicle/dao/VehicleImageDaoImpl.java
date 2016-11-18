package me.skynda.vehicle.dao;

import me.skynda.common.interfaces.daos.ImageDao;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.interfaces.daos.VehicleImageDao;
import me.skynda.vehicle.dto.ImageDto;
import me.skynda.vehicle.dto.ImageContainerDto;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleImage;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class VehicleImageDaoImpl extends SkyndaBaseEntityDaoImpl<VehicleImage> implements VehicleImageDao {

    @Autowired
    private ImageDao imageDao;

    @Override
    public void addMultipleToVehicle(Vehicle vehicle, List<ImageContainerDto> images) {

        Session session = getSession();
        String id = vehicle.getId().toString();
        session.createSQLQuery("DELETE FROM vehicle_image WHERE vehicle_id = " + id)  // TODO: avoid SQL injection
//                .setParameter("xxx", id)
                .executeUpdate();

        if (images == null)
            return;

        for (ImageContainerDto image : images) {
            VehicleImage vehicleImage = new VehicleImage();
//            vehicleImage.setVehicle(vehicle);

            if (image.getImage() != null) {
                ImageDto imageDto = image.getImage();
                Image imageEntity = imageDao.save(Image.Factory.create(
                    imageDto.getUrl(),
                    imageDto.getBlobName(),
                    imageDto.getContainerName())
                );
//                vehicleImage.setImage(imageEntity);
            }
//            vehicleImage.setUrl(image.getThumbnail());   // TODO?
            session.save(vehicleImage);
        }
    }
}
