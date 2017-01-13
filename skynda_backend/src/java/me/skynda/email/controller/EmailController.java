package me.skynda.email.controller;

import me.skynda.common.controller.BaseController;
import me.skynda.common.dto.SimpleResponseDto;
import me.skynda.email.dto.EmailBuyVehicleDto;
import me.skynda.email.dto.EmailQuestionDto;
import me.skynda.email.dto.EmailSellVehicleDto;
import me.skynda.email.dto.EmailSubscribeDto;
import me.skynda.common.abstracts.services.EmailService;

import me.skynda.email.validators.EmailBuyVehicleDtoValidator;
import me.skynda.email.validators.EmailQuestionDtoValidator;
import me.skynda.email.validators.EmailSellVehicleDtoValidator;
import me.skynda.email.validators.EmailSubscribeDtoValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class EmailController extends BaseController {

    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/email/subscribe", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResponseDto postEmailSubscribe(@RequestBody EmailSubscribeDto dto, BindingResult bindingResult) {
        new EmailSubscribeDtoValidator().validate(dto, bindingResult);
        if (bindingResult.hasErrors())
            return SimpleResponseDto.Factory.fail(bindingResult.getAllErrors());
        return emailService.sendEmail(dto);
    }

    @RequestMapping(value = "/email/buy-vehicle", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResponseDto postEmailBuyVehicle(@RequestBody EmailBuyVehicleDto dto, BindingResult bindingResult) {
        new EmailBuyVehicleDtoValidator().validate(dto, bindingResult);
        if (bindingResult.hasErrors())
            return SimpleResponseDto.Factory.fail(bindingResult.getAllErrors());
        return emailService.sendEmail(dto);
    }

    @RequestMapping(value = "/email/sell-vehicle", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResponseDto postEmailSellVehicle(@RequestBody EmailSellVehicleDto dto, BindingResult bindingResult) {
        new EmailSellVehicleDtoValidator().validate(dto, bindingResult);
        if (bindingResult.hasErrors())
            return SimpleResponseDto.Factory.fail(bindingResult.getAllErrors());
        return emailService.sendEmail(dto);
    }

    @RequestMapping(value = "/email/question", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public SimpleResponseDto postEmailQuestion(@RequestBody EmailQuestionDto dto, BindingResult bindingResult) {
        new EmailQuestionDtoValidator().validate(dto, bindingResult);
        if (bindingResult.hasErrors())
            return SimpleResponseDto.Factory.fail(bindingResult.getAllErrors());
        return emailService.sendEmail(dto);
    }


}
