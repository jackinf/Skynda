package me.skynda.email.service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import me.skynda.common.interfaces.services.EmailService;
import me.skynda.common.interfaces.dtos.EmailBaseDto;

import java.util.Date;
import java.util.Properties;

@org.springframework.stereotype.Service
public class EmailServiceImpl implements EmailService {

    private final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
    private final String MAIL_TO = "zeka.rum@gmail.com";    // use hello@skynda.com

    /**
     * Sends email using GMAIL settings.
     * http://stackoverflow.com/questions/19493904/javax-mail-messagingexception-could-not-connect-to-smtp-host-localhost-port
     *
     * @param dto - person's info and vehicle id.
     * @return Successfully sent or not
     */
    @Override
    public boolean sendEmail(EmailBaseDto dto) {

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
        try {
            Session session = Session.getDefaultInstance(props,
                    new Authenticator() {
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication(username, password);
                        }
                    });

            // -- Create a new message --
            Message msg = new MimeMessage(session);

            // -- Set the FROM and TO fields --
            msg.setFrom(new InternetAddress(dto.getSender()));
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(MAIL_TO, false));
            msg.setSubject("Message from skynda app");
            msg.setText(dto.getContent());
            msg.setSentDate(new Date());
            Transport.send(msg);
            System.out.println("Message sent.");
        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}
