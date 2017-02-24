package me.skynda.vehicle.validators;

import me.skynda.common.entities.Vehicle;
import me.skynda.common.helper.ValidationHelper;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.ValidatorFactory;
import java.util.Set;

@Service
public class VehicleValidator implements Validator {

    @Override
    public boolean supports(Class aClass) {
        return Vehicle.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Vehicle vehicle = (Vehicle) object;
        ValidationHelper.validate(vehicle, errors);
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "model.id", "Model ID must be selected.", "Model ID must be selected.");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "price", "Price is not valid.", "Price is not valid.");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "mileage", "Mileage is not valid.", "Mileage is not valid.");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "vinCode", "Vin Code is not valid.", "Vin Code is not valid.");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "registrationNumber", "Registration Number is not valid.", "Registration Number is not valid.");
    }
}
