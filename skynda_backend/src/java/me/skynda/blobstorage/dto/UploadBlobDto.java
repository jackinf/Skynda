package me.skynda.blobstorage.dto;

import lombok.Data;

import java.io.File;

/**
 * Settings file for uploading a new file into the storage
 */
@Data
public class UploadBlobDto {

    /**
     * Name of the container, where file will be placed
     */
    private String containerName;

    /**
     * Name of the file
     */
    private String blobName;

    /**
     * Uploaded file
     */
    private File fileSource;

    /**
     * Alternative way for uploading filesToUpload
     */
    private byte[] byteArray;
}
