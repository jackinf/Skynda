package me.skynda.vehicle.controller;

import me.skynda.vehicle.dto.VehicleManufacturerDto;
import me.skynda.vehicle.dto.request.VehicleManufacturerSearchDto;
import me.skynda.vehicle.service.VehicleManufacturerService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class VehicleManufacturerControllerTest {

    @InjectMocks
    VehicleManufacturerController controller = new VehicleManufacturerController();

    @Mock
    VehicleManufacturerService vehicleManufacturerService;

    @Test
    public void getAll() throws Exception {
        /*
            ACT
         */
        VehicleManufacturerSearchDto vehicleManufacturersSearchDto = new VehicleManufacturerSearchDto();
        controller.getAll(vehicleManufacturersSearchDto);

        /*
            ASSERT
         */
        verify(vehicleManufacturerService, times(1)).get(vehicleManufacturersSearchDto);
    }

    @Test
    public void save() throws Exception {
        /*
            ACT
         */
        VehicleManufacturerDto dto = new VehicleManufacturerDto();
        controller.save(dto);

        /*
            ASSERT
         */
        verify(vehicleManufacturerService, times(1)).save(dto);
    }

}