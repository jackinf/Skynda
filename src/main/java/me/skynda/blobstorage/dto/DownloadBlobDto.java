package me.skynda.blobstorage.dto;

import lombok.Data;

/**
 * Settings file to download an entire blob container
 */
@Data
public class DownloadBlobDto {

    /**
     * Name of the container, where file is located
     */
    private String containerName;
}
