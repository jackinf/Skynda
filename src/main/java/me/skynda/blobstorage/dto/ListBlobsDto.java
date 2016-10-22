package me.skynda.blobstorage.dto;

import lombok.Data;

/**
 * Settings file for listing all files in the blob container
 */
@Data
public class ListBlobsDto {

    /**
     * Name of the container where all the files will be listed
     */
    private String containerName;
}
