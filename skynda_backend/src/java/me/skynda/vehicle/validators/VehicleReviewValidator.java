package me.skynda.vehicle.validators;

import me.skynda.common.helper.ValidationHelper;
import me.skynda.vehicle.dto.VehicleReviewAdminDto;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class VehicleReviewValidator implements Validator{
    @Override
    public boolean supports(Class<?> aClass) {
        return false;
    }

    @Override
    public void validate(Object o, Errors errors) {
        VehicleReviewAdminDto object = (VehicleReviewAdminDto) o;
        ValidationHelper.validate(object, errors);
    }
}
