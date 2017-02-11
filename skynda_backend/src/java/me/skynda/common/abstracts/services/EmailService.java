package me.skynda.common.abstracts.services;

import me.skynda.classification.dao.ClassificationDao;
import me.skynda.common.dto.SimpleResponseDto;
import me.skynda.common.helper.JsonHelper;
import me.skynda.email.dto.EmailBaseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.ObjectError;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.Date;
import java.util.Properties;

public abstract class EmailService {

    private static Logger logger = LoggerFactory.getLogger(EmailService.class);

    /**
     * Sends an email using the specified configuration like receiver, message content etc
     * @param dto Email message settings e.g. receiver, content, server...
     * @return Is message successfully sent
     */
    public abstract SimpleResponseDto sendEmail(EmailBaseDto dto);

    protected SimpleResponseDto innerSendMessage(EmailBaseDto dto, Session session, String mailTo) {
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
            logger.error("innerSendMessage failed. dto: " + JsonHelper.toJson(dto) + ", mailTo: " + mailTo, e);
            e.printStackTrace();
            ArrayList<ObjectError> errors = new ArrayList<>();
            errors.add(new ObjectError("email", "failed to send: " + e.getMessage()));
            return SimpleResponseDto.Factory.fail(errors);
        }
        return SimpleResponseDto.Factory.success();
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
