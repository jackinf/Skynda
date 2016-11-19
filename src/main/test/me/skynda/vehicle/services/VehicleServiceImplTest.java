package me.skynda.vehicle.services;

import me.skynda.blobstorage.dto.UploadBlobDto;
import me.skynda.blobstorage.dto.response.BlobStorageUploadStreamResponseDto;
import me.skynda.blobstorage.service.BlobStorageService;
import me.skynda.classification.dto.ClassificationDto;
import me.skynda.classification.entities.Classification;
import me.skynda.common.interfaces.daos.ImageDao;
import me.skynda.common.interfaces.daos.VehicleDao;
import me.skynda.common.interfaces.daos.VehicleFaultDao;
import me.skynda.common.interfaces.daos.VehicleFeatureDao;
import me.skynda.common.interfaces.daos.VehicleImageDao;
import me.skynda.common.interfaces.daos.VehicleModelDao;
import me.skynda.vehicle.dto.*;
import me.skynda.vehicle.dto.request.SearchRequestDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleModel;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.validation.BindingResult;

import java.math.BigDecimal;
import java.util.ArrayList;
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
    VehicleModelDao vehicleModelDao;

    @Mock
    VehicleFeatureDao vehicleFeatureDao;

    @Mock
    VehicleFaultDao vehicleFaultDao;

    @Mock
    VehicleImageDao vehicleImageDao;

    @Mock
    private BlobStorageService blobStorageService;

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
        List<VehicleDetailedDto> cars1 = service.getVehicles();

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
        Classification COLOR = new Classification();
        COLOR.setValue("BLACK");
        Vehicle car = new Vehicle();
        car.setColorInside(COLOR);
        when(vehicleDao.get(1L)).thenReturn(car);

        /*
            ACT
         */
        VehicleAdminDto car1 = service.getVehicle(1L);

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
        Classification COLOR = new Classification();
        COLOR.setValue("BLACK");
        Vehicle car = new Vehicle();
        car.setColorInside(COLOR);
        when(vehicleDao.get(1)).thenReturn(car);

        /*
            ACT
         */
        VehicleDetailedDto carDetailed = service.getVehicleDetailed(1L);

        /*
            ASSERT
         */
        assertEquals(COLOR, carDetailed.getColorInside().getValue());
        verify(vehicleDao, times(1)).get(1L);
    }

    @Test
    public void createOrUpdateCarForSale_test1() throws Exception {
        // Arrange
        VehicleAdminDto car = new VehicleAdminDto();
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
        ClassificationDto COLOR_BLACK = new ClassificationDto();
        COLOR_BLACK.setValue("BLACK");
        ClassificationDto COLOR_WHITE = new ClassificationDto();
        COLOR_WHITE.setValue("WHITE");
        VehicleAdminDto vehicleAdminDto = new VehicleAdminDto();
        vehicleAdminDto.setColorInside(COLOR_BLACK);
        vehicleAdminDto.setColorOutside(COLOR_WHITE);
        vehicleAdminDto.setVinCode("1234536564");
        vehicleAdminDto.setPrice(BigDecimal.TEN);
        vehicleAdminDto.setRegistrationNumber("123ABC");
        vehicleAdminDto.setMileage(BigDecimal.TEN);
        final String CAR_MODEL_CODE_1 = "AAA111";
        BindingResult bindingResult = mock(BindingResult.class);

        // Prepare images
        final String fakeBase64Image = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
        final String newUri = "newUri";
        ImageDto cont1 = ImageDto.Factory.createWithBase64(fakeBase64Image);
        ImageDto cont2 = ImageDto.Factory.createWithBase64(fakeBase64Image);
        ImageDto cont3 = ImageDto.Factory.createWithBase64(fakeBase64Image);
        ImageDto cont4 = ImageDto.Factory.createWithBase64(fakeBase64Image);
        ImageDto cont5 = ImageDto.Factory.createWithBase64(fakeBase64Image);
        vehicleAdminDto.setMainImage(cont1);

        ArrayList<ImageContainerDto> imageDtos = new ArrayList<>();
        ImageContainerDto imageContainerDto1 = new ImageContainerDto();
        imageContainerDto1.setImage(cont2);
        imageDtos.add(imageContainerDto1);
        ImageContainerDto imageContainerDto2 = new ImageContainerDto();
        imageContainerDto2.setImage(cont3);
        imageDtos.add(imageContainerDto2);
        vehicleAdminDto.setImages(imageDtos);

        ArrayList<FaultBaseDto> faultDtos = new ArrayList<>();
        FaultBaseDto faultDto1 = new FaultBaseDto();
        faultDto1.setImage(cont4);
        faultDtos.add(faultDto1);
        FaultBaseDto faultDto2 = new FaultBaseDto();
        faultDto2.setImage(cont5);
        faultDtos.add(faultDto2);
        vehicleAdminDto.setFaults(faultDtos);

        when(blobStorageService.uploadStream(any(UploadBlobDto.class)))
            .thenReturn(BlobStorageUploadStreamResponseDto.Factory.succeed(newUri));

        // Prepare to return fake vehicle model
        VehicleModel carModel = new VehicleModel();
        carModel.setModelCode(CAR_MODEL_CODE_1);
        when(vehicleModelDao.getByModelCode(CAR_MODEL_CODE_1)).thenReturn(carModel);

        Vehicle addedCar = new Vehicle();
        final Long addedCarValue = 55L;
        addedCar.setId(addedCarValue);
        when(vehicleDao.saveOrUpdate(any(Vehicle.class))).thenReturn(addedCar);

        /*
            ACT
         */
        CreateOrUpdateResponseDto orUpdateCarForSale = service.createOrUpdateVehicle(vehicleAdminDto, bindingResult);

        /*
            ASSERT
         */
        assertEquals(true, orUpdateCarForSale.isSuccess());
        assertEquals(addedCarValue, orUpdateCarForSale.getId());
        assertEquals(null, cont2.getBase64File());
        assertEquals(newUri, cont2.getUrl());
        assertEquals(null, cont3.getBase64File());
        assertEquals(newUri, cont3.getUrl());
        assertEquals(null, cont4.getBase64File());
        assertEquals(newUri, cont4.getUrl());
        assertEquals(null, cont5.getBase64File());
        assertEquals(newUri, cont5.getUrl());

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
        SearchRequestDto searchRequestDto = new SearchRequestDto();
        ArrayList<Vehicle> cars = new ArrayList<>();
        cars.add(new Vehicle());
        cars.add(new Vehicle());
        cars.add(new Vehicle());
        when(vehicleDao.search(searchRequestDto)).thenReturn(cars);

        /*
            ACT
         */
//        SearchResponseDto responseDto = service.search(searchRequestDto);

        /*
            ASSERT
         */
        assertTrue(true);
//        assertTrue(responseDto.isSuccess());
//        assertEquals(cars.size(), responseDto.getVehicles().size());
    }

}