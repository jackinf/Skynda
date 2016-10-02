package me.skynda.service;

import me.skynda.dto.EmailPersonDetailsDto;

public interface EmailService {

    boolean sendEmail(EmailPersonDetailsDto dto);
}
