package me.skynda.vehicle.dao;

import me.skynda.vehicle.dto.FaultsDto;
import me.skynda.vehicle.dto.ImageContainerDto;
import me.skynda.vehicle.entity.Vehicle;
import me.skynda.vehicle.entity.VehicleFault;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.helper.SkyndaUtility;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class VehicleFaultDaoImpl extends SkyndaBaseEntityDaoImpl<VehicleFault> implements VehicleFaultDao {

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

            Optional<ImageContainerDto> resolve = SkyndaUtility.resolve(() -> fault.getImageContainer());
            if (resolve != null) {
                ImageContainerDto imageContainerDto = resolve.get();
                vehicleFault.setImageUrl(imageContainerDto.getImageUrl());
                vehicleFault.setImageBlobName(imageContainerDto.getBlobName());
                vehicleFault.setImageContainerName(imageContainerDto.getContainerName());
            }
            session.save(vehicleFault);
        }
    }

}
