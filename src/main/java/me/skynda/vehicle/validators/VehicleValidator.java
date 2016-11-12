package me.skynda.vehicle.validators;

import me.skynda.vehicle.entity.Vehicle;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
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
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        javax.validation.Validator validator = factory.getValidator();
        Vehicle car = (Vehicle) object;
        Set<ConstraintViolation<Vehicle>> constraintViolations = validator.validate(car);
        for (ConstraintViolation<Vehicle> constraintViolation : constraintViolations) {
            String errorKey = constraintViolation.getPropertyPath().toString();
            String errorMessage = constraintViolation.getMessage();
            errors.reject(errorKey, errorMessage);
        }
    }
}
