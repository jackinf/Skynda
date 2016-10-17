package me.skynda.dto.blobStorage.request;

import lombok.Data;

@Data
public class DeleteBlobDto {
    private String containerName;
    private String blobName;
}
