package me.skynda.vehicle.service;

import me.skynda.blobstorage.dto.UploadBlobDto;
import me.skynda.blobstorage.dto.response.BlobStorageUploadStreamResponseDto;
import me.skynda.blobstorage.service.BlobStorageService;
import me.skynda.common.dao.ImageDao;
import me.skynda.vehicle.dao.*;
import me.skynda.vehicle.dto.*;
import me.skynda.vehicle.dto.request.VehicleSearchRequestDto;
import me.skynda.vehicle.entity.Vehicle;
import me.skynda.vehicle.entity.VehicleModel;
import me.skynda.vehicle.service.converter.VehicleConverter;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.SearchResponseDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.validation.BindingResult;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class VehicleServiceImplTest {

    @InjectMocks
    private VehicleServiceImpl service = new VehicleServiceImpl();

    @Mock
    VehicleDao vehicleDao;

    @Mock
    VehicleModelsDao vehicleModelsDao;

    @Mock
    VehicleFeatureDao vehicleFeatureDao;

    @Mock
    VehicleFaultDao vehicleFaultDao;

    @Mock
    VehicleImageDao vehicleImageDao;

    @Mock
    private BlobStorageService blobStorageService;

    @Spy
    private VehicleConverter vehicleConverter;

    @Mock
    private BlobStorageService validator;

    @Mock
    private ImageDao imageDao;

    @Test
    public void getCars() throws Exception {
        /*
            ARRANGE
         */
        ArrayList<Vehicle> cars = new ArrayList<>();
        cars.add(new Vehicle());
        cars.add(new Vehicle());
        cars.add(new Vehicle());
        when(vehicleDao.getAll()).thenReturn(cars);

        /*
            ACT
         */
        List<VehicleDisplayDto> cars1 = service.getVehicles();

        /*
            ASSERT
         */
        assertEquals(cars.size(), cars1.size());
    }

    @Test
    public void getCar() throws Exception {
        /*
            ARRANGE
         */
        final String COLOR = "black";
        Vehicle car = new Vehicle();
        car.setColorInside(COLOR);
        when(vehicleDao.get(1L)).thenReturn(car);

        /*
            ACT
         */
        VehicleDto car1 = service.getVehicle(1L);

        /*
            ASSERT
         */
        assertEquals(COLOR, car1.getColorInside());
        verify(vehicleDao, times(1)).get(1L);
    }

    @Test
    public void getCarDetailed() throws Exception {
        /*
            ARRANGE
         */
        final String COLOR = "black";
        Vehicle car = new Vehicle();
        car.setColorInside(COLOR);
        when(vehicleDao.get(1L)).thenReturn(car);

        /*
            ACT
         */
        VehicleDisplayDto carDetailed = service.getVehicleDetailed(1L);

        /*
            ASSERT
         */
        assertEquals(COLOR, carDetailed.getVehicleGeneralDto().getColorInside());
        verify(vehicleDao, times(1)).get(1L);
    }

    @Test
    public void createOrUpdateCarForSale_test1() throws Exception {
        // Arrange
        VehicleDto car = new VehicleDto();
        BindingResult bindingResult = mock(BindingResult.class);
        when(bindingResult.hasErrors()).thenReturn(true);

        // Act
        CreateOrUpdateResponseDto orUpdateCarForSale = service.createOrUpdateVehicle(car, bindingResult);

        // Assert
        assertEquals(false, orUpdateCarForSale.isSuccess());
        final Integer totalErrors = 8;
        verify(bindingResult, times(totalErrors)).reject(any(String.class), any(String.class));
    }

    @Test
    public void createOrUpdateCarForSale_test2() throws Exception {
        /*
            ARRANGE
         */

        // Prepare vehicle
        VehicleDto vehicleDto = new VehicleDto();
        vehicleDto.setColorInside("black");
        vehicleDto.setColorOutside("white");
        vehicleDto.setVinCode("1234536564");
        vehicleDto.setPrice(BigDecimal.TEN);
        vehicleDto.setRegistrationNumber("123ABC");
        vehicleDto.setMileage(BigDecimal.TEN);
        final String CAR_MODEL_CODE_1 = "AAA111";
        vehicleDto.setVehicleModelsCode(CAR_MODEL_CODE_1);
        BindingResult bindingResult = mock(BindingResult.class);

        // Prepare images
        final String fakeBase64Image = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
        final String newUri = "newUri";
        ImageContainerDto cont1 = ImageContainerDto.Factory.createWithBase64(fakeBase64Image);
        ImageContainerDto cont2 = ImageContainerDto.Factory.createWithBase64(fakeBase64Image);
        ImageContainerDto cont3 = ImageContainerDto.Factory.createWithBase64(fakeBase64Image);
        ImageContainerDto cont4 = ImageContainerDto.Factory.createWithBase64(fakeBase64Image);
        ImageContainerDto cont5 = ImageContainerDto.Factory.createWithBase64(fakeBase64Image);
        vehicleDto.setMainImageContainer(cont1);

        ArrayList<ImagesDto> imageDtos = new ArrayList<>();
        ImagesDto imagesDto1 = new ImagesDto();
        imagesDto1.setImageContainer(cont2);
        imageDtos.add(imagesDto1);
        ImagesDto imagesDto2 = new ImagesDto();
        imagesDto2.setImageContainer(cont3);
        imageDtos.add(imagesDto2);
        vehicleDto.setImages(imageDtos);

        ArrayList<FaultsDto> faultDtos = new ArrayList<>();
        FaultsDto faultDto1 = new FaultsDto();
        faultDto1.setImageContainer(cont4);
        faultDtos.add(faultDto1);
        FaultsDto faultDto2 = new FaultsDto();
        faultDto2.setImageContainer(cont5);
        faultDtos.add(faultDto2);
        vehicleDto.setFaults(faultDtos);

        when(blobStorageService.uploadStream(any(UploadBlobDto.class)))
            .thenReturn(BlobStorageUploadStreamResponseDto.Factory.succeed(newUri));

        // Prepare to return fake vehicle model
        VehicleModel carModel = new VehicleModel();
        carModel.setModelCode(CAR_MODEL_CODE_1);
        when(vehicleModelsDao.getByModelCode(CAR_MODEL_CODE_1)).thenReturn(carModel);

        Vehicle addedCar = new Vehicle();
        final Long addedCarValue = 55L;
        addedCar.setId(addedCarValue);
        when(vehicleDao.saveOrUpdate(any(Vehicle.class))).thenReturn(addedCar);

        /*
            ACT
         */
        CreateOrUpdateResponseDto orUpdateCarForSale = service.createOrUpdateVehicle(vehicleDto, bindingResult);

        /*
            ASSERT
         */
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
        verify(vehicleDao, times(1)).saveOrUpdate(any(Vehicle.class));
        verify(blobStorageService, times(5)).uploadStream(any(UploadBlobDto.class));    // uploaded 5 files
    }

    @Test
    public void deleteCar() throws Exception {
        /*
            ACT
         */
        DeleteResponseDto deleteResponseDto = service.deleteVehicle(1L);

        /*
            ASSERT
         */
        assertTrue(deleteResponseDto.isSuccess());
        verify(vehicleDao, times(1)).delete(1L);
    }

    @Test
    public void search() throws Exception {
        /*
            ARRANGE
         */
        VehicleSearchRequestDto vehicleSearchRequestDto = new VehicleSearchRequestDto();
        ArrayList<Vehicle> cars = new ArrayList<>();
        cars.add(new Vehicle());
        cars.add(new Vehicle());
        cars.add(new Vehicle());
        when(vehicleDao.search(vehicleSearchRequestDto)).thenReturn(cars);

        /*
            ACT
         */
        SearchResponseDto responseDto = service.search(vehicleSearchRequestDto);

        /*
            ASSERT
         */
        assertTrue(responseDto.isSuccess());
        assertEquals(cars.size(), responseDto.getVehicles().size());
    }

}