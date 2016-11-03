package me.skynda.car.dto;

import lombok.Data;

@Data
public class CarDtoImageFileToUpload {

    /**
     * REQUIRED: Upload input for file service
     */
    private String base64File;

    /**
     * REQUIRED: Key of the database item to give url to
     */
    private Long id;

    /**
     * SHOULD BE NULL OR EMPTY! Upload output from file service
     */
    private String url;
}
