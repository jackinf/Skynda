package me.skynda.car.service;

import me.skynda.car.dao.CarManufacturerDao;
import me.skynda.car.dto.CarManufacturerDto;
import me.skynda.car.dto.request.CarManufacturersSearchDto;
import me.skynda.car.dto.response.CarManufacturerResponseDto;
import me.skynda.car.model.CarManufacturer;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CarManufacturerServiceImpl implements  CarManufacturerService {

    @Autowired
    CarManufacturerDao carManufacturerDao;

    @Override
    public List<CarManufacturerResponseDto> get(CarManufacturersSearchDto dto) { // TODO: use CarManufacturersSearchDto to search
        List<CarManufacturerResponseDto> responseDtos = new ArrayList<>();
        carManufacturerDao.getAll().forEach(c -> {
            CarManufacturerResponseDto responseDto = new CarManufacturerResponseDto();
            responseDto.setManufacturerCode(c.getManufacturerCode());
            responseDto.setTitle(c.getTitle());
            responseDto.setDescription(c.getDescription());
            responseDtos.add(responseDto);
        });
        return responseDtos;
    }

    @Override
    public CarManufacturer save(CarManufacturerDto carManufacturerDto) {
        CarManufacturer carManufacturer;
        Mapper mapper = new DozerBeanMapper();
        carManufacturer = mapper.map(carManufacturerDto, CarManufacturer.class);
        return carManufacturerDao.saveOrUpdate(carManufacturer);
    }
}
