package me.skynda.blobstorage.dto;

import lombok.Data;

import java.io.File;

@Data
public class UploadBlobDto {
    private String containerName;
    private String blobName;
    private File fileSource;
}
