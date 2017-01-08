package me.skynda.email.validators;

import me.skynda.common.helper.ValidationHelper;
import me.skynda.email.dto.EmailSellVehicleDto;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Created by zekar on 1/8/2017.
 */
public class EmailSellVehicleDtoValidator implements Validator {

    @Override
    public boolean supports(Class aClass) {
        return EmailSellVehicleDto.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        EmailSellVehicleDto a = (EmailSellVehicleDto) object;
        ValidationHelper.validate(a, errors);
    }
}
