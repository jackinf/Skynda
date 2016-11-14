package me.skynda.common.interfaces.dtos;

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
