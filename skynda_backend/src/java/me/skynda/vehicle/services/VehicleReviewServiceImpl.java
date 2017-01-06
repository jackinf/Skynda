package me.skynda.vehicle.services;

import me.skynda.blobstorage.service.BlobStorageService;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.daos.ImageDao;
import me.skynda.common.interfaces.daos.VehicleReviewDao;
import me.skynda.common.interfaces.services.VehicleReviewService;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.dto.VehicleReviewAdminDto;
import me.skynda.vehicle.entities.VehicleReview;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.List;
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
        VehicleReview vehicleReview = dto.getId() != null
                ? vehicleReviewDao.get(dto.getId())     // existing (UPDATE
                : new VehicleReview();                  // new (ADD)

        /*
            Map
         */
        vehicleReview.setText(dto.getText());
        vehicleReview.setRating(dto.getRating());

        /*
            Media upload/save.
         */
        Image newLogo = blobStorageService.handleMedia(dto.getLogo(), vehicleReview.getLogo());
        Image newVideo = blobStorageService.handleMedia(dto.getVideo(), vehicleReview.getVideo());
        vehicleReview.setLogo(newLogo);
        vehicleReview.setVideo(newVideo);

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
