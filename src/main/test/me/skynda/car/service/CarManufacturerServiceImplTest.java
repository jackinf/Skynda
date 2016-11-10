package me.skynda.car.service;

import me.skynda.car.dao.CarManufacturerDao;
import me.skynda.car.dto.CarManufacturerDto;
import me.skynda.car.dto.request.CarManufacturersSearchDto;
import me.skynda.car.dto.response.CarManufacturerResponseDto;
import me.skynda.car.model.CarManufacturer;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class CarManufacturerServiceImplTest {

    @InjectMocks
    CarManufacturerServiceImpl service = new CarManufacturerServiceImpl();

    @Mock
    CarManufacturerDao carManufacturerDao;

    @Test
    public void get() throws Exception {
        // Arrange
        ArrayList<CarManufacturer> prepared = new ArrayList<>();
        CarManufacturer first = new CarManufacturer();
        first.setTitle("title123");
        first.setManufacturerCode("manufacturerCode123");
        first.setDescription("description123");
        prepared.add(first);
        prepared.add(new CarManufacturer());
        prepared.add(new CarManufacturer());
        when(carManufacturerDao.getAll()).thenReturn(prepared);

        // Act
        List<CarManufacturerResponseDto> response = service.get(new CarManufacturersSearchDto());

        // Assert
        assertEquals(3, response.size());
        CarManufacturerResponseDto carModelResponseDto = response.get(0);
        assertEquals("title123", carModelResponseDto.getTitle());
        assertEquals("manufacturerCode123", carModelResponseDto.getManufacturerCode());
        assertEquals("description123", carModelResponseDto.getDescription());
    }

    @Test
    public void save() throws Exception {
        // Act
        service.save(new CarManufacturerDto());

        // Assert
        verify(carManufacturerDao, times(1)).saveOrUpdate(any(CarManufacturer.class));
    }

}