package me.skynda.email.validators;

import me.skynda.common.helper.ValidationHelper;
import me.skynda.email.dto.EmailQuestionDto;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Created by zekar on 1/8/2017.
 */
public class EmailQuestionDtoValidator implements Validator {

    @Override
    public boolean supports(Class aClass) {
        return EmailQuestionDto.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        EmailQuestionDto a = (EmailQuestionDto) object;
        ValidationHelper.validate(a, errors);
    }
}
