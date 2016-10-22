package me.skynda.email.dto;

import lombok.Data;

@Data
public class EmailSubscribeDto implements IEmailBaseDto {

    /**
     * Person's first name
     * */
    private String firstName;

    /**
     * Person's last name
     */
    private String lastName;

    /**
     * Person's email
     */
    private String email;

    /**
     * Person's mobile phone
     */
    private String mobilePhone;

    /**
     * Primary key of car to know from which page was the info sent.
     * This helps to identify, in which car the user is interested in.
     */
    private String carPk;

    @Override
    public String getSender() {
        return this.getEmail();
    }

    @Override
    public String getContent() {
        return "Client is interested in buying a car. " +
                "First name: " + this.getFirstName() +
                ", Last name: " + this.getLastName() +
                ", Car he/she is interested in: " + this.getCarPk();
    }
}
