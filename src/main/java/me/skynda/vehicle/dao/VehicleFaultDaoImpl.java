package me.skynda.vehicle.dao;

import me.skynda.common.dao.ImageDao;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.vehicle.dto.FaultsDto;
import me.skynda.vehicle.dto.ImageContainerDto;
import me.skynda.common.entity.Image;
import me.skynda.vehicle.entity.Vehicle;
import me.skynda.vehicle.entity.VehicleFault;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class VehicleFaultDaoImpl extends SkyndaBaseEntityDaoImpl<VehicleFault> implements VehicleFaultDao {

    @Autowired
    private ImageDao imageDao;

    @Override
    public void addMultipleToVehicle(Vehicle vehicle, List<FaultsDto> faults) {

        Session session = getSession();
        String id = vehicle.getId().toString();
        session.createSQLQuery("DELETE FROM car_fault WHERE cars_for_sale_id = " + id)  // TODO: avoid SQL injection
//                .setParameter("xxx", id)
                .executeUpdate();

        if (faults == null)
            return;

        for (FaultsDto fault : faults) {
            VehicleFault vehicleFault = new VehicleFault();
            vehicleFault.setVehicle(vehicle);
            vehicleFault.setText(fault.getText());

            if (fault.getImageContainer() != null) {
                ImageContainerDto imageContainerDto = fault.getImageContainer();
                Image image = imageDao.save(Image.Factory.create(imageContainerDto.getImageUrl(),
                    imageContainerDto.getBlobName(),
                    imageContainerDto.getContainerName()));
                vehicleFault.setImage(image);
            }
            session.save(vehicleFault);
        }
    }

}
