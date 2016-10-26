package me.skynda.car.dao;

import me.skynda.car.dto.FaultsDto;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarFault;
import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CarFaultDaoImpl extends SkyndaBaseEntityDaoImpl<CarFault> implements CarFaultDao {

    @Override
    public void addMultipleToCar(Car car, List<FaultsDto> faults) {
        // TODO: Fix sql injection problems
        Session session = getSession();
        session.createSQLQuery("DELETE FROM car_fault WHERE cars_for_sale.id = " + car.getId()).executeUpdate();
        session.getTransaction().commit();

        for (FaultsDto fault : faults) {
            CarFault carFault = new CarFault();
            carFault.setCar(car);
            carFault.setText(fault.getText());
            carFault.setImageUrl(fault.getImg());
            session.save(carFault);
        }
        session.close();
    }

}
