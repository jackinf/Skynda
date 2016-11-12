package me.skynda.vehicle.dao;

import me.skynda.vehicle.dto.ImageContainerDto;
import me.skynda.vehicle.dto.ImagesDto;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.helper.SkyndaUtility;
import me.skynda.vehicle.entity.Vehicle;
import me.skynda.vehicle.entity.VehicleImage;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class VehicleImageDaoImpl extends SkyndaBaseEntityDaoImpl<VehicleImage> implements VehicleImageDao {

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

            Optional<ImageContainerDto> resolve = SkyndaUtility.resolve(() -> image.getImageContainer());
            if (resolve != null) {
                ImageContainerDto imageContainerDto = resolve.get();
                vehicleImage.setImageUrl(imageContainerDto.getImageUrl());
                vehicleImage.setImageBlobName(imageContainerDto.getBlobName());
                vehicleImage.setImageContainerName(imageContainerDto.getContainerName());
            }
//            vehicleImage.setImageUrl(image.getThumbnail());   // TODO?
            session.save(vehicleImage);
        }
    }
}
