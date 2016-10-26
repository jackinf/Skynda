package me.skynda.car.service;

import me.skynda.car.dao.CarDao;
import me.skynda.car.dao.CarModelsDao;
import me.skynda.car.dto.CarDto;
import me.skynda.car.dto.SingleCarDataDto;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarModels;
import me.skynda.car.service.converter.CarConverter;
import me.skynda.common.dto.CreateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.UpdateResponseDto;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class CarServiceImpl implements CarService {

    @Autowired
    CarDao carDao;

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
    public CreateResponseDto saveCarForSale(CarDto carDto) {
        Car car = carConverter.transform(carDto);

        CarModels carModel = carModelsDao.getByModelCode(carDto.getCarModelsCode());
        car.setCarModels(carModel);

        // TODO:
        //        for (CarDto.FeatureDto feature : car.getFeatures()) { .../* add or update or delete features */ }
        //        for (CarDto.FeatureDto feature : car.getFaults()) { .../* add or update or delete faults */ }
        //        for (CarDto.FeatureDto feature : car.getImages()) { .../* add or update or delete images */ }

//        throw new NotImplementedException("Update car is not implemented");
        car.setCreated(new Date());
        Car addedCar = carDao.save(car);    // TODO: Get success code

        CreateResponseDto response = new CreateResponseDto();
        response.setId(addedCar.getId());
        response.setSuccess(true);
        return response;
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
