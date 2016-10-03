package me.skynda.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.skynda.dao.CarDao;
import me.skynda.dto.SingleCarDataDto;
import me.skynda.service.converter.CarConverter;

@Service
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
	
}
