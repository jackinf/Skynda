package me.skynda.controller;

import me.skynda.dto.EmailPersonDetailsDto;
import me.skynda.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/email", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean postEmail(@RequestBody EmailPersonDetailsDto dto) {
        return emailService.sendEmail(dto);
    }
}
