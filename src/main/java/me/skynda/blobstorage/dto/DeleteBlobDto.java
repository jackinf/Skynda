package me.skynda.blobstorage.dto;

import lombok.Data;

/**
 * Settings for deleting blob files
 */
@Data
public class DeleteBlobDto {

    /**
     * Container, where file is located
     */
    private String containerName;

    /**
     * Name of the file which it is being searched by
     */
    private String blobName;
}
