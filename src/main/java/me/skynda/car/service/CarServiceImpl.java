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
	public Car saveCarForSale(CarDto carDto) {
		Mapper mapper = new DozerBeanMapper();
		Car car = mapper.map(carDto, Car.class);
		CarModels cm = carModelsDao.getByModelCode(carDto.getCarModelsCode());
		car.setCarModels(cm);
		return carDao.saveOrUpdate(car);
	}

	@Override
	public void deleteCar(Long id) {
		carDao.delete(id);
	}

}
