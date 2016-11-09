package me.skynda.car.validators;

import me.skynda.car.model.Car;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.annotation.Resource;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.ValidatorFactory;
import java.util.Set;

@Service
public class CarValidator implements Validator {

    @Override
    public boolean supports(Class aClass) {
        return Car.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        javax.validation.Validator validator = factory.getValidator();
        Car car = (Car) object;
        Set<ConstraintViolation<Car>> constraintViolations = validator.validate(car);
        for (ConstraintViolation<Car> constraintViolation : constraintViolations) {
            errors.reject(constraintViolation.getPropertyPath().toString(), constraintViolation.getMessage());
        }
    }
}
