package me.skynda.service;

import me.skynda.dto.IEmailBaseDto;

public interface EmailService {

    boolean sendEmail(IEmailBaseDto dto);
}
