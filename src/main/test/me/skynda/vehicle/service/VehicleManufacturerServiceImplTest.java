package me.skynda.vehicle.service;

import me.skynda.vehicle.dao.VehicleManufacturerDao;
import me.skynda.vehicle.dto.VehicleManufacturerDto;
import me.skynda.vehicle.dto.request.VehicleManufacturerSearchDto;
import me.skynda.vehicle.dto.response.VehicleManufacturerResponseDto;
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
public class VehicleManufacturerServiceImplTest {

    @InjectMocks
    VehicleManufacturerServiceImpl service = new VehicleManufacturerServiceImpl();

    @Mock
    VehicleManufacturerDao vehicleManufacturerDao;

    @Test
    public void get() throws Exception {
        // Arrange
        ArrayList<VehicleManufacturer> prepared = new ArrayList<>();
        VehicleManufacturer first = new VehicleManufacturer();
        first.setTitle("title123");
        first.setManufacturerCode("manufacturerCode123");
        first.setDescription("description123");
        prepared.add(first);
        prepared.add(new VehicleManufacturer());
        prepared.add(new VehicleManufacturer());
        when(vehicleManufacturerDao.getAll()).thenReturn(prepared);

        // Act
        List<VehicleManufacturerResponseDto> response = service.get(new VehicleManufacturerSearchDto());

        // Assert
        assertEquals(3, response.size());
        VehicleManufacturerResponseDto carModelResponseDto = response.get(0);
        assertEquals("title123", carModelResponseDto.getTitle());
        assertEquals("manufacturerCode123", carModelResponseDto.getManufacturerCode());
        assertEquals("description123", carModelResponseDto.getDescription());
    }

    @Test
    public void save() throws Exception {
        // Act
        service.save(new VehicleManufacturerDto());

        // Assert
        verify(vehicleManufacturerDao, times(1)).saveOrUpdate(any(VehicleManufacturer.class));
    }

}