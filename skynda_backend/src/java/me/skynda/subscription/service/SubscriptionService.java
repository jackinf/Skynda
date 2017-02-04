package me.skynda.subscription.service;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.interfaces.daos.ISubscriptionDao;
import me.skynda.common.interfaces.services.ISubscriptionService;
import me.skynda.subscription.dto.SubscribeDto;
import me.skynda.subscription.entities.Subscription;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SubscriptionService implements ISubscriptionService {

    @Autowired
    ISubscriptionDao subscriptionDao;

    @Autowired
    private Mapper mapper;

    @Override
    public CreateOrUpdateResponseDto Subscribe(SubscribeDto emailDto) {
        emailDto.setIsActive(true);
        Subscription subscription  = subscriptionDao.getByEmail(emailDto.getEmail());

        if(subscription == null){
            subscription = subscriptionDao.save(mapper.map(emailDto, Subscription.class));
        }

        return CreateOrUpdateResponseDto.Factory.success(subscription.getId(), true);
    }
}
