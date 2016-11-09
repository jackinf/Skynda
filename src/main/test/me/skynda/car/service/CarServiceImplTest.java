package me.skynda.car.service;

import me.skynda.blobstorage.dto.UploadBlobDto;
import me.skynda.blobstorage.dto.response.BlobStorageUploadStreamResponseDto;
import me.skynda.blobstorage.service.BlobStorageService;
import me.skynda.car.dao.*;
import me.skynda.car.dto.CarDto;
import me.skynda.car.dto.FaultsDto;
import me.skynda.car.dto.ImageContainerDto;
import me.skynda.car.dto.ImagesDto;
import me.skynda.car.model.Car;
import me.skynda.car.model.CarModels;
import me.skynda.car.service.converter.CarConverter;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.validation.BindingResult;

import java.math.BigDecimal;
import java.util.ArrayList;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class CarServiceImplTest {

    @InjectMocks
    private CarServiceImpl service = new CarServiceImpl();

    @Mock
    CarDao carDao;

    @Mock
    CarModelsDao carModelsDao;

    @Mock
    CarFeatureDao carFeatureDao;

    @Mock
    CarFaultDao carFaultDao;

    @Mock
    CarImageDao carImageDao;

    @Mock
    private BlobStorageService blobStorageService;

    @Spy
    private CarConverter carConverter;

    @Mock
    private BlobStorageService validator;

    @Test
    public void getCars() throws Exception {

    }

    @Test
    public void getCar() throws Exception {

    }

    @Test
    public void getCarDetailed() throws Exception {

    }

    @Test
    public void createOrUpdateCarForSale_test1() throws Exception {
        // Arrange
        CarDto car = new CarDto();
        BindingResult bindingResult = mock(BindingResult.class);
        when(bindingResult.hasErrors()).thenReturn(true);

        // Act
        CreateOrUpdateResponseDto orUpdateCarForSale = service.createOrUpdateCarForSale(car, bindingResult);

        // Assert
        assertEquals(false, orUpdateCarForSale.isSuccess());
        final Integer totalErrors = 7;
        verify(bindingResult, times(totalErrors)).reject(any(String.class), any(String.class));
    }

    @Test
    public void createOrUpdateCarForSale_test2() throws Exception {
        // Arrange

        // Prepare car
        CarDto carDto = new CarDto();
        carDto.setColorInside("black");
        carDto.setColorOutside("white");
        carDto.setVinCode("1234536564");
        carDto.setPrice(BigDecimal.TEN);
        carDto.setRegistrationNumber("123ABC");
        carDto.setMileage(BigDecimal.TEN);
        final String CAR_MODEL_CODE_1 = "AAA111";
        carDto.setCarModelsCode(CAR_MODEL_CODE_1);
        BindingResult bindingResult = mock(BindingResult.class);

        // Prepare images
        final String fakeBase64Image = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
        final String newUri = "newUri";
        ImageContainerDto cont1 = ImageContainerDto.Factory.createWithBase64(fakeBase64Image);
        ImageContainerDto cont2 = ImageContainerDto.Factory.createWithBase64(fakeBase64Image);
        ImageContainerDto cont3 = ImageContainerDto.Factory.createWithBase64(fakeBase64Image);
        ImageContainerDto cont4 = ImageContainerDto.Factory.createWithBase64(fakeBase64Image);
        ImageContainerDto cont5 = ImageContainerDto.Factory.createWithBase64(fakeBase64Image);
        carDto.setMainImageContainer(cont1);

        ArrayList<ImagesDto> imageDtos = new ArrayList<>();
        ImagesDto imagesDto1 = new ImagesDto();
        imagesDto1.setImageContainer(cont2);
        imageDtos.add(imagesDto1);
        ImagesDto imagesDto2 = new ImagesDto();
        imagesDto2.setImageContainer(cont3);
        imageDtos.add(imagesDto2);
        carDto.setImages(imageDtos);

        ArrayList<FaultsDto> faultDtos = new ArrayList<>();
        FaultsDto faultDto1 = new FaultsDto();
        faultDto1.setImageContainer(cont4);
        faultDtos.add(faultDto1);
        FaultsDto faultDto2 = new FaultsDto();
        faultDto2.setImageContainer(cont5);
        faultDtos.add(faultDto2);
        carDto.setFaults(faultDtos);

        when(blobStorageService.uploadStream(any(UploadBlobDto.class)))
            .thenReturn(BlobStorageUploadStreamResponseDto.Factory.succeed(newUri));

        // Prepare to return fake car model
        CarModels carModel = new CarModels();
        carModel.setModelCode(CAR_MODEL_CODE_1);
        when(carModelsDao.getByModelCode(CAR_MODEL_CODE_1)).thenReturn(carModel);

        Car addedCar = new Car();
        final Long addedCarValue = 55L;
        addedCar.setId(addedCarValue);
        when(carDao.saveOrUpdate(any(Car.class))).thenReturn(addedCar);

        // Act
        CreateOrUpdateResponseDto orUpdateCarForSale = service.createOrUpdateCarForSale(carDto, bindingResult);

        // Assert
        assertEquals(true, orUpdateCarForSale.isSuccess());
        assertEquals(addedCarValue, orUpdateCarForSale.getId());
        assertEquals(null, cont2.getBase64File());
        assertEquals(newUri, cont2.getImageUrl());
        assertEquals(null, cont3.getBase64File());
        assertEquals(newUri, cont3.getImageUrl());
        assertEquals(null, cont4.getBase64File());
        assertEquals(newUri, cont4.getImageUrl());
        assertEquals(null, cont5.getBase64File());
        assertEquals(newUri, cont5.getImageUrl());
        // Make sure there were no errors
        final Integer totalErrors = 0;
        verify(bindingResult, times(totalErrors)).reject(any(String.class), any(String.class));
        verify(carDao, times(1)).saveOrUpdate(any(Car.class));
        verify(blobStorageService, times(5)).uploadStream(any(UploadBlobDto.class));    // uploaded 5 files
    }

    @Test
    public void deleteCar() throws Exception {

    }

    @Test
    public void search() throws Exception {

    }

}