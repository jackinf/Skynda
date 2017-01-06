package me.skynda.common.interfaces.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.subscription.dto.SubscribeDto;

public interface ISubscriptionService {
    CreateOrUpdateResponseDto Subscribe(SubscribeDto email);
}
