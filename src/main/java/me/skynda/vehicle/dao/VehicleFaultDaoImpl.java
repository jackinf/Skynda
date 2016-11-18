package me.skynda.vehicle.dao;

import me.skynda.common.interfaces.daos.ImageDao;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.interfaces.daos.VehicleFaultDao;
import me.skynda.vehicle.dto.FaultBaseDto;
import me.skynda.vehicle.dto.ImageDto;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleFault;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class VehicleFaultDaoImpl extends SkyndaBaseEntityDaoImpl<VehicleFault> implements VehicleFaultDao {

    @Autowired
    private ImageDao imageDao;

    @Override
    public void addMultipleToVehicle(Vehicle vehicle, List<FaultBaseDto> faults) {

        Session session = getSession();
        String id = vehicle.getId().toString();
        session.createSQLQuery("DELETE FROM vehicle_fault WHERE vehicle_id = " + id)  // TODO: avoid SQL injection
//                .setParameter("xxx", id)
                .executeUpdate();

        if (faults == null)
            return;

        for (FaultBaseDto fault : faults) {
            VehicleFault vehicleFault = new VehicleFault();
//            vehicleFault.setVehicle(vehicle);
            vehicleFault.setText(fault.getText());

            if (fault.getImage() != null) {
                ImageDto imageDto = fault.getImage();
                Image image = imageDao.save(Image.Factory.create(imageDto.getUrl(),
                    imageDto.getBlobName(),
                    imageDto.getContainerName()));
//                vehicleFault.setImage(image);
            }
            session.save(vehicleFault);
        }
    }

}
