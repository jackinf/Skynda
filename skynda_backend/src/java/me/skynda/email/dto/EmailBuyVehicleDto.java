package me.skynda.email.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by zekar on 1/10/2017.
 */
@Data
public class EmailBuyVehicleDto implements EmailBaseDto {

    @NotNull
    @Size(min = 2, max = 10)
    private String fullName;   // TODO: this is full name

    @NotNull
    @NotEmpty
    @Email
    private String email;

    @NotNull
    @NotEmpty
    private String phone;

    private String comment;

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
                "\nName: " + this.getFullName() +
                "\nEmail: " + this.getEmail() +
                "\nPhone: " + this.getPhone() +
                "\nCar he/she is interested in: http://skynda.me/details/" + this.getCarPk();    }
}
