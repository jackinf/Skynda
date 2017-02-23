package me.skynda.vehicle.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.IVehicleReviewDao;
import me.skynda.common.interfaces.services.IBlobStorageService;
import me.skynda.common.interfaces.services.IVehicleReviewService;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.dto.VehicleReviewAdminDto;
import me.skynda.common.entities.VehicleReview;
import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static Logger logger = LoggerFactory.getLogger(VehicleService.class);

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
        try {
            return vehicleReviewDao
                    .getAll()
                    .stream()
                    .map(entity -> mapper.map(entity, VehicleReviewAdminDto.class))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("getAll failed.", e);
            throw e;
        }
    }

    @Override
    public List<VehicleReviewAdminDto> getAllBy(Serializable vehicleId){
        try {
            List<VehicleReview> vehicleReportList = vehicleReviewDao.getAllBy(vehicleId);
            return vehicleReportList.stream().map(entity -> mapper.map(entity, VehicleReviewAdminDto.class))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("getAllBy failed. vehicleId: " + vehicleId, e);
            throw e;
        }
    }

    @Override
    public VehicleReviewAdminDto getSingleBy(Integer id) {
        try {
            VehicleReview vehicleReview = vehicleReviewDao.get(id);
            return mapper.map(vehicleReview, VehicleReviewAdminDto.class);
        } catch (Exception e) {
            logger.error("getSingleBy failed. id: " + id, e);
            throw e;
        }
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdate(VehicleReviewAdminDto dto, BindingResult bindingResult) {
        try {
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
            try {
                VehicleReview persistedVehicleReview = vehicleReviewDao.saveOrUpdate(vehicleReview);
                CreateOrUpdateResponseDto response = CreateOrUpdateResponseDto.Factory.success(persistedVehicleReview.getId(), true);
                response.setIsModal(dto.getIsModal());
                response.setVehicleId(persistedVehicleReview.getVehicleId());
                return response;

            }catch (Exception e){
                CreateOrUpdateResponseDto response = CreateOrUpdateResponseDto.Factory.fail(e.getMessage(), null);
                return response;
            }

        } catch (Exception e) {
            logger.error("createOrUpdate failed. dto: " + JsonHelper.toJson(dto), e);
            throw e;
        }
    }

    @Override
    public DeleteResponseDto delete(Integer id) {
        try {
            DeleteResponseDto response = new DeleteResponseDto();
            VehicleReview review = vehicleReviewDao.get(id);
            vehicleReviewDao.deleteEntity(review, response);
            return response;
        } catch (Exception e) {
            logger.error("delete failed. id: " + id, e);
            return DeleteResponseDto.Factory.fail(e.getMessage());
        }
    }
}
