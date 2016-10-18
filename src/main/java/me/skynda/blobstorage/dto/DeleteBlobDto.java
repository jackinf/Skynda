package me.skynda.blobstorage.dto;

import lombok.Data;

@Data
public class DeleteBlobDto {
    private String containerName;
    private String blobName;
}
