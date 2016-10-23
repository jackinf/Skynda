package me.skynda.car.service;

import me.skynda.car.dao.CarDao;
import me.skynda.car.dao.CarManufacturerDao;
import me.skynda.car.dao.CarModelsDao;
import me.skynda.car.dto.CarDto;
import me.skynda.car.dto.CarManufacturerDto;
import me.skynda.car.dto.CarModelsDto;
import me.skynda.car.dto.SingleCarDataDto;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarManufacturer;
import me.skynda.car.model.CarModels;
import me.skynda.car.service.converter.CarConverter;

import me.skynda.common.dto.CreateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.UpdateResponseDto;
import org.apache.commons.lang3.NotImplementedException;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CarServiceImpl implements CarService {

    @Autowired
    CarDao carDao;

    @Autowired
    CarManufacturerDao carManufacturerDao;

    @Autowired
    CarModelsDao carModelsDao;

    @Autowired
    private CarConverter carConverter;

    @Override
    public List<SingleCarDataDto> getCars() {
        List<SingleCarDataDto> singleCarDataDto = new ArrayList<SingleCarDataDto>();
        carDao.getAll().forEach(c -> {
            singleCarDataDto.add(carConverter.transform(c));
        });
        return singleCarDataDto;
    }

    @Override
    public SingleCarDataDto getCar(Long id) {
        Car model = carDao.get(id);
        SingleCarDataDto dto = carConverter.transform(model);
        return dto;
    }

    @Override
    public CarManufacturer saveOrUpdateCarManufacturer(CarManufacturerDto carManufacturerDto) {
        CarManufacturer carManufacturer;
        Mapper mapper = new DozerBeanMapper();
        carManufacturer = mapper.map(carManufacturerDto, CarManufacturer.class);
        return carManufacturerDao.saveOrUpdate(carManufacturer);
    }

    @Override
    public CarModels saveOrUpdateCarModel(CarModelsDto carModelsDto) {
        CarModels carModels;
        Mapper mapper = new DozerBeanMapper();
        carModels = mapper.map(carModelsDto, CarModels.class);
        CarManufacturer cm = carManufacturerDao.getByManufacturerCode(carModelsDto.getCarManufacturerCode());
        carModels.setCarManufacturer(cm);
        return carModelsDao.saveOrUpdate(carModels);
    }

    @Override
    public CreateResponseDto saveCarForSale(CarDto carDto) {
        Car car = carConverter.transform(carDto);

        CarModels carModel = carModelsDao.getByModelCode(carDto.getCarModelsCode());
        car.setCarModels(carModel);

        CarManufacturer carManufacturer = carManufacturerDao.getByManufacturerCode(carDto.getCarManufacturerCode());
        // TODO: car.setCarManufacturer(carManufacturer);

        // TODO:
        //        for (CarDto.FeatureDto feature : car.getFeatures()) { .../* add or update or delete features */ }
        //        for (CarDto.FeatureDto feature : car.getFaults()) { .../* add or update or delete faults */ }
        //        for (CarDto.FeatureDto feature : car.getImages()) { .../* add or update or delete images */ }

        throw new NotImplementedException("Update car is not implemented");
//        return carDao.save(car);
    }

    @Override
    public UpdateResponseDto updateCarForSale(CarDto carDto) {
        throw new NotImplementedException("Update car is not implemented");
//        Mapper mapper = new DozerBeanMapper();
//        Car car = mapper.map(carDto, Car.class);
//        CarModels cm = carModelsDao.getByModelCode(carDto.getCarGeneralDto().getModel());
//        car.setCarModels(cm);
//        return carDao.update(car);
    }

    @Override
    public DeleteResponseDto deleteCar(Long id) {
        carDao.delete(id);  // TODO: make somehow sure that the item has been deleted.

        DeleteResponseDto response = new DeleteResponseDto();
        response.setSuccess(true);
        return response;
    }

}
