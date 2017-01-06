package me.skynda.vehicle.services;

import me.skynda.common.interfaces.daos.ClassificationDao;
import me.skynda.common.interfaces.daos.VehicleModelDao;
import me.skynda.common.interfaces.services.VehicleModelService;
import me.skynda.vehicle.dto.VehicleModelAdminDto;
import me.skynda.vehicle.dto.request.ModelRequestDto;
import me.skynda.vehicle.dto.response.VehicleModelResponseDto;
import me.skynda.classification.entities.Classification;
import me.skynda.classification.entities.ClassificationType;
import me.skynda.vehicle.entities.VehicleModel;
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
    VehicleModelDao vehicleModelDao;

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
//        vehicleManufacturer.setClassificationType(type);
//        vehicleManufacturer.setValue("manufacturerCode123");
//        first.setVehicleManufacturer(vehicleManufacturer);
        prepared.add(first);
        prepared.add(new VehicleModel());
        prepared.add(new VehicleModel());
        when(vehicleModelDao.getAll()).thenReturn(prepared);

        // Act
        List<VehicleModelResponseDto> response = service.getAll(new ModelRequestDto());

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
        service.createOrUpdate(new VehicleModelAdminDto(), null);

        // Assert
        verify(vehicleModelDao, times(1)).saveOrUpdate(any(VehicleModel.class));
    }

}