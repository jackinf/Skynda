package me.skynda.email.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class EmailSubscribeDto implements EmailBaseDto {

    /**
     * Person's first name
     * */
    @NotNull
    @Size(min = 2, max =100)
    private String firstName;

    /**
     * Person's last name
     */
    @NotNull
    @Size(min = 2, max =100)
    private String lastName;

    /**
     * Person's email
     */
    @NotNull
    @Email
    private String email;

    /**
     * Person's mobile phone
     */
    private String mobilePhone;

    /**
     * Primary key of vehicle to know from which page was the info sent.
     * This helps to identify, in which vehicle the user is interested in.
     */
    @NotNull
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
