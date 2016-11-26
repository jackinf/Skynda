package me.skynda.common.interfaces.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.VehicleReviewAdminDto;
import org.springframework.validation.BindingResult;

import java.util.List;

/**
 * Created by jevgenir on 11/14/2016.
 */
public interface VehicleReviewService {
    List<VehicleReviewAdminDto> getAll();

    VehicleReviewAdminDto getSingleBy(Integer id);

    CreateOrUpdateResponseDto createOrUpdate(VehicleReviewAdminDto dto, BindingResult bindingResult);

    DeleteResponseDto delete(Integer id);

}
