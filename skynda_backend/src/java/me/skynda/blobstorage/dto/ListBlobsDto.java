package me.skynda.blobstorage.dto;

import lombok.Data;

/**
 * Settings file for listing all filesToUpload in the blob container
 */
@Data
public class ListBlobsDto {

    /**
     * Name of the container where all the filesToUpload will be listed
     */
    private String containerName;
}
