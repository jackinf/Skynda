/**
 * Created by zekar on 1/8/2017.
 */

package me.skynda.email.service;

import me.skynda.common.abstracts.services.EmailService;
import me.skynda.common.dto.SimpleResponseDto;
import me.skynda.email.dto.EmailBaseDto;
import org.springframework.context.annotation.Primary;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import java.util.Properties;

@org.springframework.stereotype.Service
public class OutlookServiceImpl extends EmailService {

    private final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
    private final String MAIL_TO = "hello@skynda.me";

    /**
     * Sends email using Outlook settings.
     * http://stackoverflow.com/questions/19493904/javax-mail-messagingexception-could-not-connect-to-smtp-host-localhost-port
     *
     * @param dto - person's info and vehicle id.
     * @return Successfully sent or not
     */
    @Override
    public SimpleResponseDto sendEmail(EmailBaseDto dto) {

        // Get a Properties object
//        Properties props = System.getProperties();
//        props.setProperty("mail.smtp.host", "smtp.office365.com");
//        props.setProperty("mail.smtp.socketFactory.class", SSL_FACTORY);
//        props.setProperty("mail.smtp.socketFactory.fallback", "true");
//        props.setProperty("mail.smtp.port", "587");
//        props.setProperty("mail.smtp.socketFactory.port", "587");
//        props.put("mail.smtp.auth", "true");
//        props.put("mail.debug", "true");
//        props.put("mail.store.protocol", "pop3");
//        props.put("mail.transport.protocol", "smtp");
        final String username = "hello@skynda.me";   // real email used as a server to send emails
        final String password = "Skyndaisbest124_";  // real password
//        Session session = getMailSession(props, username, password);

        Authenticator authenticator = new Authenticator()
        {
            @Override
            protected PasswordAuthentication getPasswordAuthentication()
            {
                return new PasswordAuthentication(username, password);
            }
        };
        Properties properties = new Properties();
        properties.setProperty("mail.smtp.host", "smtp.office365.com");
        properties.setProperty("mail.smtp.port", "587");
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.starttls.enable", "true");
        Session session = Session.getInstance( properties, authenticator );

        return innerSendMessage(dto, session, MAIL_TO);
    }
}