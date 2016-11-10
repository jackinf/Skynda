package me.skynda.car.dao;

import me.skynda.car.model.Car;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CarFaultDaoImplTest {

    CarFaultDaoImpl carFaultDao = new CarFaultDaoImpl();

//    @Before
//    public void setUp() throws Exception {
//        // setup the session factory
//
//        Configuration configuration = new Configuration();
//        configuration.addAnnotatedClass(Car.class)
//                .addAnnotatedClass(CarModel.class)
//                .addAnnotatedClass(CarManufacturer.class);
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
    public void addMultipleToCar() throws Exception {
        carFaultDao.addMultipleToCar(new Car(), new ArrayList<>());
    }

}