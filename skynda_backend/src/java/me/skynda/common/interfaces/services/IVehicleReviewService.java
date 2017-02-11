package me.skynda.common.interfaces.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.VehicleReviewAdminDto;
import org.springframework.validation.BindingResult;

import java.io.Serializable;
import java.util.List;


public interface IVehicleReviewService {
    List<VehicleReviewAdminDto> getAll();

    VehicleReviewAdminDto getSingleBy(Integer id);

    CreateOrUpdateResponseDto createOrUpdate(VehicleReviewAdminDto dto, BindingResult bindingResult);

    DeleteResponseDto delete(Integer id);

    List<VehicleReviewAdminDto> getAllBy(Serializable vehicleId);

}
