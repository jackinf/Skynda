package me.skynda.dto;

import lombok.Data;

@Data
public class EmailPersonDetailsDto {

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

}
