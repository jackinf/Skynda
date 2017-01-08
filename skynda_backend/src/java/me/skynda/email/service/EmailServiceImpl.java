package me.skynda.email.service;

import javax.mail.*;

import me.skynda.common.abstracts.services.EmailService;
import me.skynda.common.dto.SimpleResponseDto;
import me.skynda.email.dto.EmailBaseDto;
import org.springframework.context.annotation.Primary;

import java.util.Properties;

@Primary // http://stackoverflow.com/questions/10534053/autowiring-two-beans-implementing-same-interface-how-to-set-default-bean-to-au
@org.springframework.stereotype.Service
public class EmailServiceImpl extends EmailService {

    private final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
    private final String MAIL_TO = "hello@skynda.me";    // use hello@skynda.com

    /**
     * Sends email using GMAIL settings.
     * http://stackoverflow.com/questions/19493904/javax-mail-messagingexception-could-not-connect-to-smtp-host-localhost-port
     *
     * @param dto - person's info and vehicle id.
     * @return Successfully sent or not
     */
    @Override
    public SimpleResponseDto sendEmail(EmailBaseDto dto) {

        // Get a Properties object
        Properties props = System.getProperties();
        props.setProperty("mail.smtp.host", "smtp.gmail.com");
        props.setProperty("mail.smtp.socketFactory.class", SSL_FACTORY);
        props.setProperty("mail.smtp.socketFactory.fallback", "false");
        props.setProperty("mail.smtp.port", "465");
        props.setProperty("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.auth", "true");
        props.put("mail.debug", "true");
        props.put("mail.store.protocol", "pop3");
        props.put("mail.transport.protocol", "smtp");
        final String username = "zeka.rum@gmail.com";   // real email used as a server to send emails
        final String password = "krmp dehy lixe ihwq";  // real password (generated app password)
        Session session = getMailSession(props, username, password);
        return innerSendMessage(dto, session, MAIL_TO);
    }
}
