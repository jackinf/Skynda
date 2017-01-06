package me.skynda.vehicle.dto;

import lombok.Data;

@Data
public class VehicleDtoImageFileToDelete {

    /**
     * REQUIRED!
     */
    private String blobName;

    /**
     * REQUIRED!
     */
    private String containerName;

}
