package me.skynda.car.service;

import me.skynda.car.dao.CarManufacturerDao;
import me.skynda.car.dao.CarModelsDao;
import me.skynda.car.dto.CarModelDto;
import me.skynda.car.dto.SingleCarDataDto;
import me.skynda.car.dto.request.CarModelsRequestDto;
import me.skynda.car.dto.response.CarModelResponseDto;
import me.skynda.car.model.CarManufacturer;
import me.skynda.car.model.CarModels;
import me.skynda.common.helper.SkyndaUtility;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CarModelServiceImpl implements CarModelService {

    @Autowired
    CarManufacturerDao carManufacturerDao;

    @Autowired
    CarModelsDao carModelsDao;

    @Override
    public List<CarModelResponseDto> get(CarModelsRequestDto dto) { // TODO: use CarModelsRequestDto to search
        List<CarModelResponseDto> responseDtos = new ArrayList<>();
        carModelsDao.getAll().forEach(c -> {
            CarModelResponseDto responseDto = new CarModelResponseDto();
            CarManufacturer carManufacturer = c.getCarManufacturer();
            if (carManufacturer != null) {
                responseDto.setManufacturerCode(carManufacturer.getManufacturerCode());
            }
            responseDto.setModelCode(c.getModelCode());
            responseDto.setTitle(c.getTitle());
            responseDtos.add(responseDto);
        });
        return responseDtos;
    }

    @Override
    public CarModels save(CarModelDto carModelDto) {
        CarModels carModels;
        Mapper mapper = new DozerBeanMapper();
        carModels = mapper.map(carModelDto, CarModels.class);
        CarManufacturer cm = carManufacturerDao.getByManufacturerCode(carModelDto.getCarManufacturerCode());
        carModels.setCarManufacturer(cm);
        return carModelsDao.saveOrUpdate(carModels);
    }
}
