package me.skynda.vehicle.controller;

import me.skynda.vehicle.dto.VehicleDto;
import me.skynda.vehicle.dto.SingleVehicleDataDto;
import me.skynda.vehicle.dto.request.VehicleSearchRequestDto;
import me.skynda.vehicle.service.VehicleService;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.validation.BindingResult;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

public class VehicleControllerTest {

    @InjectMocks
    private VehicleController controller = new VehicleController();

    @Mock
    private VehicleService vehicleService;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getAll() throws Exception {
        controller.getAll(new VehicleSearchRequestDto());
        verify(vehicleService, times(1)).getVehicles();
    }

    @Test
    public void get() throws Exception {
        // Arrange
        VehicleDto dto = new VehicleDto();
        when(vehicleService.getVehicle(1L)).thenReturn(dto);

        // Act
        VehicleDto returnedDto1 = controller.get(1L);
        VehicleDto returnedDto2 = controller.get(2L);

        // Assert
        assertEquals(dto, returnedDto1);
        assertEquals(null, returnedDto2);
    }

    @Test
    public void getDetailed() throws Exception {
        // Arrange
        SingleVehicleDataDto dto = new SingleVehicleDataDto();
        when(vehicleService.getVehicleDetailed(1L)).thenReturn(dto);

        // Act
        SingleVehicleDataDto detailed1 = controller.getDetailed(1L);
        SingleVehicleDataDto detailed2 = controller.getDetailed(2L);

        // Assert
        assertEquals(dto, detailed1);
        assertEquals(null, detailed2);
    }

    @Test
    public void add() throws Exception {
        // Arrange
        VehicleDto vehicleDto = new VehicleDto();
        CreateOrUpdateResponseDto createOrUpdateResponseDto = new CreateOrUpdateResponseDto();
        BindingResult bindingResult = mock(BindingResult.class);
        when(vehicleService.createOrUpdateVehicle(vehicleDto, bindingResult)).thenReturn(createOrUpdateResponseDto);

        // Act
        CreateOrUpdateResponseDto added = controller.add(vehicleDto, bindingResult);

        // Assert
        verify(vehicleService, times(1)).createOrUpdateVehicle(vehicleDto, bindingResult);
        assertEquals(createOrUpdateResponseDto, added);
    }

    @Test
    public void update() throws Exception {
        // Arrange
        VehicleDto vehicleDto = new VehicleDto();
        CreateOrUpdateResponseDto createOrUpdateResponseDto = new CreateOrUpdateResponseDto();
        BindingResult bindingResult = mock(BindingResult.class);
        when(vehicleService.createOrUpdateVehicle(vehicleDto, bindingResult)).thenReturn(createOrUpdateResponseDto);

        // Act
        CreateOrUpdateResponseDto updated = controller.update(1L, vehicleDto, bindingResult);

        // Assert
        verify(vehicleService, times(1)).createOrUpdateVehicle(vehicleDto, bindingResult);
        assertEquals(createOrUpdateResponseDto, updated);
    }

    @Test
    public void delete() throws Exception {
        // Arrange
        DeleteResponseDto deleteResponseDto = new DeleteResponseDto();
        deleteResponseDto.setSuccess(true);
        when(vehicleService.deleteVehicle(1L)).thenReturn(deleteResponseDto);

        // Act
        DeleteResponseDto deleteResponse = controller.delete(1L);

        // Assert
        assertEquals(deleteResponseDto, deleteResponse);
    }

    @Test
    public void search() throws Exception {
        // Arrange

        // Act

        // Assert
    }

}