package me.skynda.subscription.validators;

import me.skynda.common.helper.ValidationHelper;
import me.skynda.subscription.dto.SubscribeDto;
import me.skynda.subscription.entities.Subscription;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class SubscriptionEmailValidator implements Validator {
    @Override
    public boolean supports(Class aClass) {
        return Subscription.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        SubscribeDto dto = (SubscribeDto) o;
        ValidationHelper.validate(dto, errors);
    }
}
