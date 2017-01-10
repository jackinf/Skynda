package me.skynda.email.validators;

import me.skynda.common.helper.ValidationHelper;
import me.skynda.email.dto.EmailBuyVehicleDto;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Created by zekar on 1/10/2017.
 */
public class EmailBuyVehicleDtoValidator implements Validator {

    @Override
    public boolean supports(Class aClass) {
        return EmailBuyVehicleDto.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        EmailBuyVehicleDto a = (EmailBuyVehicleDto) object;
        ValidationHelper.validate(a, errors);
    }
}
