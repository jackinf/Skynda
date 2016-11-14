package me.skynda.email.dto;

public interface EmailBaseDto {

    /**
     * Sender of the email
     * @return - sender
     */
    String getSender();

    /**
     * The content of the email
     * @return
     */
    String getContent();
}
