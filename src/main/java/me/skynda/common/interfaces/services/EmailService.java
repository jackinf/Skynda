package me.skynda.common.interfaces.services;

import me.skynda.common.interfaces.dtos.EmailBaseDto;

public interface EmailService {

    /**
     * Sends an email using the specified configuration like receiver, message content etc
     * @param dto Email message settings e.g. receiver, content, server...
     * @return Is message successfully sent
     */
    boolean sendEmail(EmailBaseDto dto);
}
