package me.skynda.vehicle.dto;

import lombok.Data;

@Data
public class VehicleDtoImageFileToUpload {

    /**
     * REQUIRED: Upload input for file service
     */
    private String base64File;

    /**
     * REQUIRED: Key of the database item to give url to
     */
    private Integer id;

    /**
     * SHOULD BE NULL OR EMPTY! Upload output from file service
     */
    private String url;
}
