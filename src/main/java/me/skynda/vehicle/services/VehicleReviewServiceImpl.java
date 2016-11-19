package me.skynda.vehicle.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.daos.VehicleDao;
import me.skynda.common.interfaces.daos.VehicleReviewDao;
import me.skynda.common.interfaces.services.VehicleReviewService;
import me.skynda.vehicle.dto.VehicleReportAdminDto;
import me.skynda.vehicle.dto.VehicleReviewAdminDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleModel;
import me.skynda.vehicle.entities.VehicleReview;
import org.apache.commons.lang3.NotImplementedException;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.Date;
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
    VehicleDao vehicleDao;

    @Autowired
    private Mapper mapper;

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
        /*
            Create new or load existing
         */
        VehicleReview vehicleReview;
        if (dto.getId() != null) {
            vehicleReview = vehicleReviewDao.get(dto.getId());
            mapper.map(dto, vehicleReview);
        } else {
            vehicleReview = mapper.map(dto, VehicleReview.class);
        }

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
