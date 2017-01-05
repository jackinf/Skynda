package me.skynda.blobstorage.dto;

import lombok.Data;

/**
 * Settings file for creating a Blob Container
 */
@Data
public class CreateContainerDto {

    /**
     * Name of the Azure Storage Container
     */
    private String containerName;
}
