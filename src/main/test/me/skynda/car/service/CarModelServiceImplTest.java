package me.skynda.car.service;

import me.skynda.car.dao.CarManufacturerDao;
import me.skynda.car.dao.CarModelsDao;
import me.skynda.car.dto.CarModelDto;
import me.skynda.car.dto.request.CarModelsRequestDto;
import me.skynda.car.dto.response.CarModelResponseDto;
import me.skynda.car.model.CarManufacturer;
import me.skynda.car.model.CarModel;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class CarModelServiceImplTest {

    @InjectMocks
    private CarModelService service = new CarModelServiceImpl();

    @Mock
    CarManufacturerDao carManufacturerDao;

    @Mock
    CarModelsDao carModelsDao;

    @Test
    public void get() throws Exception {
        // Arrange
        ArrayList<CarModel> prepared = new ArrayList<>();
        CarModel first = new CarModel();
        first.setTitle("title123");
        first.setModelCode("modelCode123");
        CarManufacturer carManufacturer = new CarManufacturer();
        carManufacturer.setManufacturerCode("manufacturerCode123");
        first.setCarManufacturer(carManufacturer);
        prepared.add(first);
        prepared.add(new CarModel());
        prepared.add(new CarModel());
        when(carModelsDao.getAll()).thenReturn(prepared);

        // Act
        List<CarModelResponseDto> response = service.get(new CarModelsRequestDto());

        // Assert
        assertEquals(3, response.size());
        CarModelResponseDto carModelResponseDto = response.get(0);
        assertEquals("title123", carModelResponseDto.getTitle());
        assertEquals("modelCode123", carModelResponseDto.getModelCode());
        assertEquals("manufacturerCode123", carModelResponseDto.getManufacturerCode());
    }

    @Test
    public void save() throws Exception {
        // Act
        service.save(new CarModelDto());

        // Assert
        verify(carModelsDao, times(1)).saveOrUpdate(any(CarModel.class));
    }

}