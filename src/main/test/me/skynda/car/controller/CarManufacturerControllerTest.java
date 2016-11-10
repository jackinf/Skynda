package me.skynda.car.controller;

import me.skynda.car.dto.CarManufacturerDto;
import me.skynda.car.dto.request.CarManufacturersSearchDto;
import me.skynda.car.service.CarManufacturerService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class CarManufacturerControllerTest {

    @InjectMocks
    CarManufacturerController controller = new CarManufacturerController();

    @Mock
    CarManufacturerService carManufacturerService;

    @Test
    public void getAll() throws Exception {
        /*
            ACT
         */
        CarManufacturersSearchDto carManufacturersSearchDto = new CarManufacturersSearchDto();
        controller.getAll(carManufacturersSearchDto);

        /*
            ASSERT
         */
        verify(carManufacturerService, times(1)).get(carManufacturersSearchDto);
    }

    @Test
    public void save() throws Exception {
        /*
            ACT
         */
        CarManufacturerDto dto = new CarManufacturerDto();
        controller.save(dto);

        /*
            ASSERT
         */
        verify(carManufacturerService, times(1)).save(dto);
    }

}