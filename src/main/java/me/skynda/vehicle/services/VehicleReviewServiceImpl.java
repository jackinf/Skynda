package me.skynda.vehicle.services;

import me.skynda.blobstorage.dto.UploadBlobDto;
import me.skynda.blobstorage.dto.response.BlobStorageUploadStreamResponseDto;
import me.skynda.blobstorage.service.BlobStorageService;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.helper.SkyndaUtility;
import me.skynda.common.interfaces.daos.ImageDao;
import me.skynda.common.interfaces.daos.VehicleReviewDao;
import me.skynda.common.interfaces.services.VehicleReviewService;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.dto.ImageDto;
import me.skynda.vehicle.dto.VehicleReviewAdminDto;
import me.skynda.vehicle.entities.VehicleReview;
import org.apache.commons.lang3.SerializationUtils;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Created by jevgenir on 11/14/2016.
 */
@Service
@Transactional
public class VehicleReviewServiceImpl implements VehicleReviewService {

    @Autowired
    VehicleReviewDao vehicleReviewDao;

    @Autowired
    ImageDao imageDao;

    @Autowired
    private Mapper mapper;

    @Autowired
    BlobStorageService blobStorageService;

    @Override
    public List<VehicleReviewAdminDto> getAll() {
        return vehicleReviewDao
                .getAll()
                .stream()
                .map(entity -> mapper.map(entity, VehicleReviewAdminDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public VehicleReviewAdminDto getSingleBy(Integer id) {
        VehicleReview vehicleReview = vehicleReviewDao.get(id);
        return mapper.map(vehicleReview, VehicleReviewAdminDto.class);
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdate(VehicleReviewAdminDto dto, BindingResult bindingResult) {
        VehicleReview vehicleReview = dto.getId() != null ? vehicleReviewDao.get(dto.getId()) : new VehicleReview();

        // In order to avoid mapping dto values using Dozer automapper, we break reference by cloning an object
        Image oldLogo = Image.Factory.clone(vehicleReview.getLogo());
        Image oldVideo = Image.Factory.clone(vehicleReview.getVideo());

        /*
            Map
         */
        mapper.map(dto, vehicleReview);

        /*
            Media upload/save.
         */
        Image newLogo = blobStorageService.handleMedia(dto.getLogo(), oldLogo);
        Image newVideo = blobStorageService.handleMedia(dto.getVideo(), oldVideo);
        vehicleReview.setLogo(newLogo != null ? newLogo : oldLogo);
        vehicleReview.setVideo(newVideo != null ? newVideo : oldVideo);

        /*
            Save
         */
        VehicleReview persistedVehicleReview = vehicleReviewDao.saveOrUpdate(vehicleReview);
        return CreateOrUpdateResponseDto.Factory.success(persistedVehicleReview.getId(), true);
    }

    @Override
    public DeleteResponseDto delete(Integer id) {
        vehicleReviewDao.delete(id);  // TODO: make somehow sure that the item has been deleted.

        DeleteResponseDto response = new DeleteResponseDto();
        response.setSuccess(true);
        return response;
    }
}
