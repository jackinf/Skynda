package me.skynda.subscription.controller;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.SimpleResponseDto;
import me.skynda.common.interfaces.services.ISubscriptionService;
import me.skynda.subscription.dto.SubscribeDto;
import me.skynda.subscription.validators.SubscriptionEmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class SubscriptionController {

    private final ISubscriptionService subscribeService;

    @Autowired
    public SubscriptionController(ISubscriptionService subscribeService) {
        this.subscribeService = subscribeService;
    }

    @RequestMapping(value = "/subscribe", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResponseDto subscribeEmail(@RequestBody SubscribeDto dto, BindingResult bindingResult) {
        new SubscriptionEmailValidator().validate(dto, bindingResult);

        if(bindingResult.hasErrors()){
            return SimpleResponseDto.Factory.fail(bindingResult.getAllErrors());
        }

        SimpleResponseDto response = subscribeService.subscribe(dto, bindingResult);

        if(!response.isSuccess()){
            return SimpleResponseDto.Factory.fail(bindingResult.getAllErrors());
        }

        return response;
    }
}
