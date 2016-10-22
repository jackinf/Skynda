package me.skynda.email.controller;

import me.skynda.car.controller.BaseController;
import me.skynda.email.dto.EmailQuestionDto;
import me.skynda.email.dto.EmailSubscribeDto;
import me.skynda.email.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class EmailController extends BaseController {

    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/email/subscribe", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean postEmailSubscribe(@RequestBody EmailSubscribeDto dto) {
        return emailService.sendEmail(dto);
    }

    @RequestMapping(value = "/email/question", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean postEmailQuestion(@RequestBody EmailQuestionDto dto) {
        return emailService.sendEmail(dto);
    }
}
