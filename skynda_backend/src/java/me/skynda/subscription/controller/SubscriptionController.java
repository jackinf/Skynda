package me.skynda.subscription.controller;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.interfaces.services.ISubscriptionService;
import me.skynda.subscription.dto.SubscribeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class SubscriptionController {

    @Autowired
    private ISubscriptionService subscribeService;

    @RequestMapping(value = "/subscribe", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public CreateOrUpdateResponseDto subscribeEmail(@RequestBody SubscribeDto dto) {
        return subscribeService.subscribe(dto);
    }
}
