package me.skynda.vehicle.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.daos.IVehicleReviewDao;
import me.skynda.common.interfaces.services.IBlobStorageService;
import me.skynda.common.interfaces.services.IVehicleReviewService;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.dto.VehicleReviewAdminDto;
import me.skynda.vehicle.entities.VehicleReview;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class VehicleReviewService implements IVehicleReviewService {

    private final IVehicleReviewDao vehicleReviewDao;
    private final Mapper mapper;
    private final IBlobStorageService blobStorageService;

    @Autowired
    public VehicleReviewService(
            IBlobStorageService blobStorageService,
            IVehicleReviewDao vehicleReviewDao,
            Mapper mapper) {
        this.blobStorageService = blobStorageService;
        this.vehicleReviewDao = vehicleReviewDao;
        this.mapper = mapper;
    }

    @Override
    public List<VehicleReviewAdminDto> getAll() {
        return vehicleReviewDao
                .getAll()
                .stream()
                .map(entity -> mapper.map(entity, VehicleReviewAdminDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<VehicleReviewAdminDto> getAllBy(Serializable vehicleId){
        List<VehicleReview> vehicleReportList = vehicleReviewDao.getAllBy(vehicleId);
        return vehicleReportList.stream().map(entity -> mapper.map(entity, VehicleReviewAdminDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public VehicleReviewAdminDto getSingleBy(Integer id) {
        VehicleReview vehicleReview = vehicleReviewDao.get(id);
        return mapper.map(vehicleReview, VehicleReviewAdminDto.class);
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdate(VehicleReviewAdminDto dto, BindingResult bindingResult) {
        VehicleReview vehicleReview = mapper.map(dto, VehicleReview.class);

        if (dto.getId() != null) {
            vehicleReview = vehicleReviewDao.get(dto.getId());
            mapper.map(dto, vehicleReview);
        }

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
        CreateOrUpdateResponseDto response = CreateOrUpdateResponseDto.Factory.success(persistedVehicleReview.getId(), true);
        response.setIsModal(dto.getIsModal());
        response.setVehicleId(persistedVehicleReview.getVehicleId());

        return response;
    }

    @Override
    public DeleteResponseDto delete(Integer id) {
        DeleteResponseDto response = new DeleteResponseDto();
        VehicleReview review = vehicleReviewDao.get(id);
        vehicleReviewDao.deleteEntity(review, response);
        response.setSuccess(true);
        return response;
    }
}
