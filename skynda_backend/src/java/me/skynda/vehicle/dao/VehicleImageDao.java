package me.skynda.vehicle.dao;

import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.IImageDao;
import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.interfaces.daos.IVehicleImageDao;
import me.skynda.vehicle.dto.ImageDto;
import me.skynda.vehicle.dto.ImageContainerDto;
import me.skynda.image.entities.Image;
import me.skynda.common.entities.Vehicle;
import me.skynda.common.entities.VehicleImage;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class VehicleImageDao extends BaseEntityDao<VehicleImage> implements IVehicleImageDao {

    @Autowired
    private IImageDao imageDao;

    private static Logger logger = LoggerFactory.getLogger(VehicleImageDao.class);

    @Override
    public void addMultipleToVehicle(Vehicle vehicle, List<ImageContainerDto> images) {

        Session session = getSession();
        String id = vehicle.getId().toString();
        try {
            session.createSQLQuery("DELETE FROM vehicle_image WHERE vehicle_id = " + id)  // TODO: avoid SQL injection
//                .setParameter("xxx", id)
                    .executeUpdate();
        } catch (Exception e) {
            logger.error("addMultipleToVehicle failed. vehicle: " + JsonHelper.toJson(vehicle) + ", images: " + JsonHelper.toJson(images), e);
        }

        if (images == null)
            return;

        for (ImageContainerDto image : images) {
            VehicleImage vehicleImage = new VehicleImage();
            vehicleImage.setVehicleId(vehicle.getId());

            if (image.getImage() != null) {
                ImageDto imageDto = image.getImage();
                Image imageEntity = imageDao.save(Image.Factory.create(
                    imageDto.getUrl(),
                    imageDto.getBlobName(),
                    imageDto.getContainerName())
                );
                vehicleImage.setImage(imageEntity);
            }
//            vehicleImage.setUrl(image.getThumbnail());   // TODO?
            session.save(vehicleImage);
        }
    }
}
