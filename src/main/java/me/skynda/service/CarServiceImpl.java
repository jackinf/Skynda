package me.skynda.service;
import java.util.ArrayList;
import java.util.List;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import me.skynda.dao.CarDao;
import me.skynda.dao.CarManufacturerDao;
import me.skynda.dao.CarModelsDao;
import me.skynda.dto.CarDto;
import me.skynda.dto.CarManufacturerDto;
import me.skynda.dto.CarModelsDto;
import me.skynda.dto.SingleCarDataDto;
import me.skynda.model.Car;
import me.skynda.model.CarManufacturer;
import me.skynda.model.CarModels;
import me.skynda.service.converter.CarConverter;

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
	public CarManufacturer saveCarManufacturer(CarManufacturerDto carManufacturerDto) {
		CarManufacturer carManufacturer = carManufacturerDto.getManufacturerCode() != null ? carManufacturerDao.get(carManufacturerDto.getManufacturerCode()) : null;
		Mapper mapper = new DozerBeanMapper();
		carManufacturer = mapper.map(carManufacturerDto, CarManufacturer.class);
		return carManufacturerDao.saveOrUpdate(carManufacturer);
	}

	@Override
	public CarModels saveCarModel(CarModelsDto carModelsDto) {
		CarModels carModels = carModelsDto.getModelCode() != null ? carModelsDao.getByModelCode(carModelsDto.getModelCode()) : null;
		Mapper mapper = new DozerBeanMapper();
		carModels = mapper.map(carModelsDto, CarModels.class);
		CarManufacturer cm = carManufacturerDao.getByManufacturerCode(carModelsDto.getCarManufacturerCode());
		carModels.setCarManufacturer(cm);
		return carModelsDao.saveOrUpdate(carModels);
	}

	@Override
	public Car saveCarForSale(CarDto carDto) {
//		Car car = carDto.getId() != null ? carModelsDao.get(carDto.getModelCode()) : null;
		Mapper mapper = new DozerBeanMapper();
		Car car = mapper.map(carDto, Car.class);
		CarModels cm = carModelsDao.getByModelCode(carDto.getCarModelsCode());
		car.setCarModels(cm);
		return carDao.save(car);
	}
	
}
