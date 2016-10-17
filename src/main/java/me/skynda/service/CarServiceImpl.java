package me.skynda.service;
import java.util.ArrayList;
import java.util.List;

import me.skynda.model.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import me.skynda.dao.CarDao;
import me.skynda.dto.SingleCarDataDto;
import me.skynda.service.converter.CarConverter;

@Service
@Transactional
public class CarServiceImpl implements CarService {
	
	@Autowired
	CarDao carDao;
	
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
	public SingleCarDataDto getCar(int id) {
		Car model = carDao.get(id);
		SingleCarDataDto dto = carConverter.transform(model);
		return dto;
	}

}
