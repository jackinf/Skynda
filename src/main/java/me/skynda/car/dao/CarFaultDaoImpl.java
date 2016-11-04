package me.skynda.car.dao;

import me.skynda.car.dto.FaultsDto;
import me.skynda.car.dto.ImageContainerDto;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarFault;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.helper.SkyndaUtility;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CarFaultDaoImpl extends SkyndaBaseEntityDaoImpl<CarFault> implements CarFaultDao {

    @Override
    public void addMultipleToCar(Car car, List<FaultsDto> faults) {

        Session session = getSession();
        String id = car.getId().toString();
        session.createSQLQuery("DELETE FROM car_fault WHERE cars_for_sale_id = " + id)  // TODO: avoid SQL injection
//                .setParameter("xxx", id)
                .executeUpdate();

        if (faults == null)
            return;

        for (FaultsDto fault : faults) {
            CarFault carFault = new CarFault();
            carFault.setCar(car);
            carFault.setText(fault.getText());

            Optional<ImageContainerDto> resolve = SkyndaUtility.resolve(() -> fault.getImageContainer());
            if (resolve != null) {
                ImageContainerDto imageContainerDto = resolve.get();
                carFault.setImageUrl(imageContainerDto.getImageUrl());
                carFault.setImageBlobName(imageContainerDto.getBlobName());
                carFault.setImageContainerName(imageContainerDto.getContainerName());
            }
            session.save(carFault);
        }
    }

}
