package me.skynda.service;


import me.skynda.dto.EmailPersonDetailsDto;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@org.springframework.stereotype.Service
public class EmailServiceImpl implements EmailService {

    private final String MAIL_TO = "zeka.rum@gmail.com";    // Recipient's email ID needs to be mentioned.
    private final String MAIL_SERVER = "mail.smtp.host";
    private final String HOST = "localhost";                // Assuming you are sending email from localhost

    @Override
    public boolean sendEmail(EmailPersonDetailsDto dto) {

        String from = dto.getEmail();    // Sender's email ID needs to be mentioned
        Properties properties = System.getProperties(); // Get system properties
        properties.setProperty(MAIL_SERVER, HOST); // Setup mail server

        // Get the default Session object.
        Session session = Session.getDefaultInstance(properties);

        try {
            MimeMessage message = new MimeMessage(session);     // Create a default MimeMessage object.
            message.setFrom(new InternetAddress(from));         // Set From: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(MAIL_TO));   // Set To: header field of the header.
            message.setSubject("Skynda test page");             // Set Subject: header field

            // Now set the actual message
            message.setText("Message contains: " +
                    "First name: " + dto.getFirstName() +
                    ", Last name: " + dto.getLastName() +
                    ", Car interested in: " + dto.getCarPk());

            // Send message
            Transport.send(message);
            System.out.println("Sent message successfully....");
        }catch (MessagingException mex) {
            mex.printStackTrace();
            return false;
        }

        return true;
    }
}
