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
    private String fullName;

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
    private String vehicleRegistrationMark;

    @Override
    public String getSender() {
        return this.getEmail();
    }

    @Override
    public String getContent() {
        return "Client is interested in selling a vehicle. " +
                "\nName: " + this.getFullName() +
                "\nEmail: " + this.getEmail() +
                "\nPhone: " + this.getPhone() +
                "\nVehicle registration number: " + this.getVehicleRegistrationMark();

    }
}
