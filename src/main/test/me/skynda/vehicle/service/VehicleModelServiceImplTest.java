package me.skynda.vehicle.service;

import me.skynda.common.dao.ClassificationDao;
import me.skynda.vehicle.dao.VehicleModelsDao;
import me.skynda.vehicle.dto.VehicleModelDto;
import me.skynda.vehicle.dto.request.VehicleModelRequestDto;
import me.skynda.vehicle.dto.response.VehicleModelResponseDto;
import me.skynda.vehicle.entity.Classification;
import me.skynda.vehicle.entity.ClassificationType;
import me.skynda.vehicle.entity.VehicleModel;
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
public class VehicleModelServiceImplTest {

    @InjectMocks
    private VehicleModelService service = new VehicleModelServiceImpl();

    @Mock
    ClassificationDao vehicleManufacturerDao;

    @Mock
    VehicleModelsDao vehicleModelsDao;

    @Test
    public void get() throws Exception {
        // Arrange
        ArrayList<VehicleModel> prepared = new ArrayList<>();
        VehicleModel first = new VehicleModel();
        first.setTitle("title123");
        first.setModelCode("modelCode123");
        ClassificationType type = new ClassificationType();
        type.setName("MANUFACTURER");
        Classification vehicleManufacturer = new Classification();
        vehicleManufacturer.setClassificationType(type);
        vehicleManufacturer.setValue("manufacturerCode123");
        first.setVehicleManufacturer(vehicleManufacturer);
        prepared.add(first);
        prepared.add(new VehicleModel());
        prepared.add(new VehicleModel());
        when(vehicleModelsDao.getAll()).thenReturn(prepared);

        // Act
        List<VehicleModelResponseDto> response = service.get(new VehicleModelRequestDto());

        // Assert
        assertEquals(3, response.size());
        VehicleModelResponseDto vehicleModelResponseDto = response.get(0);
        assertEquals("title123", vehicleModelResponseDto.getTitle());
        assertEquals("modelCode123", vehicleModelResponseDto.getModelCode());
        assertEquals("manufacturerCode123", vehicleModelResponseDto.getVehicleManufacturerCode());
    }

    @Test
    public void save() throws Exception {
        // Act
        service.save(new VehicleModelDto());

        // Assert
        verify(vehicleModelsDao, times(1)).saveOrUpdate(any(VehicleModel.class));
    }

}