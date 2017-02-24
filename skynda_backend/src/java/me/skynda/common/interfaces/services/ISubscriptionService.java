package me.skynda.common.interfaces.services;

import me.skynda.common.dto.SimpleResponseDto;
import me.skynda.subscription.dto.SubscribeDto;
import org.springframework.validation.Errors;

public interface ISubscriptionService {
    SimpleResponseDto subscribe(SubscribeDto email, Errors bindingResult);
}
