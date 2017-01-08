package me.skynda.common.abstracts.services;

import me.skynda.email.dto.EmailBaseDto;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

public abstract class EmailService {

    /**
     * Sends an email using the specified configuration like receiver, message content etc
     * @param dto Email message settings e.g. receiver, content, server...
     * @return Is message successfully sent
     */
    public abstract boolean sendEmail(EmailBaseDto dto);

    protected boolean innerSendMessage(EmailBaseDto dto, Session session, String mailTo) {
        try {
            // -- Create a new message --
            Message msg = new MimeMessage(session);

            // -- Set the FROM and TO fields --
            msg.setFrom(new InternetAddress(dto.getSender()));
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(mailTo, false));
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

    protected Session getMailSession(Properties props, final String username, final String password) {
        Session session = Session.getDefaultInstance(props,
            new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password);
                }
            });
        return session;
    }
}
