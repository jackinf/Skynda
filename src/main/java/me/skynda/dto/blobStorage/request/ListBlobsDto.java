package me.skynda.dto.blobStorage.request;

import lombok.Data;

@Data
public class ListBlobsDto {
    private String containerName;
}
