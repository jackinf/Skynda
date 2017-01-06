package me.skynda.blobstorage.dto;

import lombok.Data;

/**
 * Settings for deleting a container
 */
@Data
public class DeleteContainerDto {

    /**
     * Name of the container, which will be deleted
     */
    private String containerName;
}
