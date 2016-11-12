package me.skynda.vehicle.dao;

import me.skynda.vehicle.entity.Vehicle;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;

@RunWith(SpringRunner.class)
@SpringBootTest
public class VehicleFaultDaoImplTest {

    VehicleFaultDaoImpl vehicleFaultDao = new VehicleFaultDaoImpl();

//    @Before
//    public void setUp() throws Exception {
//        // setup the session factory
//
//        Configuration configuration = new Configuration();
//        configuration.addAnnotatedClass(Vehicle.class)
//                .addAnnotatedClass(VehicleModel.class)
//                .addAnnotatedClass(VehicleManufacturerController.class);
//
//        configuration.setProperty("hibernate.dialect", "org.hibernate.dialect.H2Dialect");
//        configuration.setProperty("hibernate.connection.driver_class", "org.h2.Driver");
//        configuration.setProperty("hibernate.connection.url", "jdbc:h2:mem");
//        configuration.setProperty("hibernate.hbm2ddl.auto", "create");
//
//        sessionFactory = configuration.buildSessionFactory();
//        session = sessionFactory.openSession();
//    }

    @Test
    public void addMultipleToVehicle() throws Exception {
        vehicleFaultDao.addMultipleToVehicle(new Vehicle(), new ArrayList<>());
    }

}