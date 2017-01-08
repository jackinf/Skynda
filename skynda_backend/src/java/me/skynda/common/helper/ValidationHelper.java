package me.skynda.common.helper;

import me.skynda.common.interfaces.Validatable;
import me.skynda.email.dto.EmailQuestionDto;
import org.springframework.validation.Errors;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.ValidatorFactory;
import java.lang.reflect.Type;
import java.util.Set;

/**
 * Created by zekar on 1/8/2017.
 */
public class ValidationHelper {

    public static <T> void validate(T object, Errors errors) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        javax.validation.Validator validator = factory.getValidator();
        Set<ConstraintViolation<T>> constraintViolations = validator.validate(object);
        for (ConstraintViolation<T> constraintViolation : constraintViolations) {
            String errorKey = constraintViolation.getPropertyPath().toString();
            String errorMessage = constraintViolation.getMessage();
            errors.reject(errorKey, errorMessage);
        }
    }
}
