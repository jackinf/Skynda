package me.skynda.service;

import me.skynda.dto.IEmailBaseDto;

public interface EmailService {

    /**
     * Sends an email using the specified configuration like receiver, message content etc
     * @param dto Email message settings e.g. receiver, content, server...
     * @return Is message successfully sent
     */
    boolean sendEmail(IEmailBaseDto dto);
}
