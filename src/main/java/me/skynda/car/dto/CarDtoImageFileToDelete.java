package me.skynda.car.dto;

import lombok.Data;

@Data
public class CarDtoImageFileToDelete {

    /**
     * REQUIRED!
     */
    private String blobName;

    /**
     * REQUIRED!
     */
    private String containerName;

}
