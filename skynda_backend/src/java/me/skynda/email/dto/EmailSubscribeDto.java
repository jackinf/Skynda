package me.skynda.email.dto;

import lombok.Data;

@Data
public class EmailSubscribeDto implements EmailBaseDto {

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
     * Primary key of vehicle to know from which page was the info sent.
     * This helps to identify, in which vehicle the user is interested in.
     */
    private String carPk;

    @Override
    public String getSender() {
        return this.getEmail();
    }

    @Override
    public String getContent() {
        return "Client is interested in buying a vehicle. " +
                "\nFirst name: " + this.getFirstName() +
                "\nLast name: " + this.getLastName() +
                "\nCar he/she is interested in: http://skynda.me/details/" + this.getCarPk();
    }
}
