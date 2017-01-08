package me.skynda.email.dto;

import lombok.Data;

/**
 * Created by zekar on 1/8/2017.
 */
@Data
public class EmailSellVehicleDto implements EmailBaseDto {

    /**
     * Seller's name
     */
    private String name;

    /**
     * Seller's email
     */
    private String email;

    /**
     * Seller's phone number
     */
    private String phone;

    /**
     * Seller's vehicle registration number
     */
    private String vehicleRegistrationNumber;

    @Override
    public String getSender() {
        return this.getEmail();
    }

    @Override
    public String getContent() {
        return "Client is interested in selling a vehicle. " +
                "Name: " + this.getName() +
                "Email: " + this.getEmail() +
                "Phone: " + this.getPhone() +
                "Vehicle registration number: " + this.getVehicleRegistrationNumber();

    }
}
