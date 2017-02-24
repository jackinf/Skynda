package me.skynda.subscription.service;

import me.skynda.common.dto.SimpleResponseDto;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.ISubscriptionDao;
import me.skynda.common.interfaces.services.ISubscriptionService;
import me.skynda.subscription.dto.SubscribeDto;
import me.skynda.subscription.entities.Subscription;
import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;

@Service
@Transactional
public class SubscriptionService implements ISubscriptionService {

    private final ISubscriptionDao subscriptionDao;
    private final Mapper mapper;
    private static Logger logger = LoggerFactory.getLogger(SubscriptionService.class);

    @Autowired
    public SubscriptionService(ISubscriptionDao subscriptionDao, Mapper mapper) {
        this.subscriptionDao = subscriptionDao;
        this.mapper = mapper;
    }

    @Override
    public SimpleResponseDto subscribe(SubscribeDto emailDto, Errors bindingResult) {
        try {
            emailDto.setIsActive(true);
            Subscription subscription  = subscriptionDao.getByEmail(emailDto.getEmail());

            if(subscription == null){
                subscriptionDao.save(mapper.map(emailDto, Subscription.class));
            }else{
                bindingResult.rejectValue("email", "email", "User already subscribed");
            }

            return SimpleResponseDto.Factory.success();
        } catch (Exception e) {
            logger.error("subscribe failed. emailDto: " + JsonHelper.toJson(emailDto), e);
            bindingResult.rejectValue(null, "Subscription", e.getMessage());
            return SimpleResponseDto.Factory.fail(null);
        }
    }
}
