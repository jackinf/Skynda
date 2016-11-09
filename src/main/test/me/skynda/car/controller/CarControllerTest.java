package me.skynda.car.controller;

import me.skynda.car.dto.CarDto;
import me.skynda.car.dto.SingleCarDataDto;
import me.skynda.car.dto.request.CarSearchRequestDto;
import me.skynda.car.service.CarService;
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

public class CarControllerTest {

    @InjectMocks
    private CarController controller = new CarController();

    @Mock
    private CarService carService;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getAll() throws Exception {
        controller.getAll(new CarSearchRequestDto());
        verify(carService, times(1)).getCars();
    }

    @Test
    public void get() throws Exception {
        // Arrange
        CarDto dto = new CarDto();
        when(carService.getCar(1L)).thenReturn(dto);

        // Act
        CarDto returnedDto1 = controller.get(1L);
        CarDto returnedDto2 = controller.get(2L);

        // Assert
        assertEquals(dto, returnedDto1);
        assertEquals(null, returnedDto2);
    }

    @Test
    public void getDetailed() throws Exception {
        // Arrange
        SingleCarDataDto dto = new SingleCarDataDto();
        when(carService.getCarDetailed(1L)).thenReturn(dto);

        // Act
        SingleCarDataDto detailed1 = controller.getDetailed(1L);
        SingleCarDataDto detailed2 = controller.getDetailed(2L);

        // Assert
        assertEquals(dto, detailed1);
        assertEquals(null, detailed2);
    }

    @Test
    public void add() throws Exception {
        // Arrange
        CarDto carDto = new CarDto();
        CreateOrUpdateResponseDto createOrUpdateResponseDto = new CreateOrUpdateResponseDto();
        BindingResult bindingResult = mock(BindingResult.class);
        when(carService.createOrUpdateCarForSale(carDto, bindingResult)).thenReturn(createOrUpdateResponseDto);

        // Act
        CreateOrUpdateResponseDto added = controller.add(carDto, bindingResult);

        // Assert
        verify(carService, times(1)).createOrUpdateCarForSale(carDto, bindingResult);
        assertEquals(createOrUpdateResponseDto, added);
    }

    @Test
    public void update() throws Exception {
        // Arrange
        CarDto carDto = new CarDto();
        CreateOrUpdateResponseDto createOrUpdateResponseDto = new CreateOrUpdateResponseDto();
        BindingResult bindingResult = mock(BindingResult.class);
        when(carService.createOrUpdateCarForSale(carDto, bindingResult)).thenReturn(createOrUpdateResponseDto);

        // Act
        CreateOrUpdateResponseDto updated = controller.update(1L, carDto, bindingResult);

        // Assert
        verify(carService, times(1)).createOrUpdateCarForSale(carDto, bindingResult);
        assertEquals(createOrUpdateResponseDto, updated);
    }

    @Test
    public void delete() throws Exception {
        // Arrange
        DeleteResponseDto deleteResponseDto = new DeleteResponseDto();
        deleteResponseDto.setSuccess(true);
        when(carService.deleteCar(1L)).thenReturn(deleteResponseDto);

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