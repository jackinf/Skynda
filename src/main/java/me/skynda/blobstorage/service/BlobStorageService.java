package me.skynda.blobstorage.service;

import com.microsoft.azure.storage.blob.ListBlobItem;

import me.skynda.blobstorage.dto.*;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

/**
 * Service for managing heavy files (blobs) like images and videos.
 */
public interface BlobStorageService {

    /**
     * Create a container where blobs will be stored.
     * @param dto Settings
     * @return Success
     */
    boolean createContainer(CreateContainerDto dto);

    /**
     * Uploads a new blob element.
     * @param dto blob element with info.
     * @return Success
     */
    boolean upload(UploadBlobDto dto);

    /**
     * Returns a list of existing blobs.
     * @param dto Settings
     * @return Blobs
     */
    List<ListBlobItem> list(ListBlobsDto dto);

    /**
     * Downloads a blob using stream.
     * @param dto Settings
     */
    void download(DownloadBlobDto dto);

    /**
     * Deletes a blob.
     * @param dto Settings
     * @return Success
     */
    boolean delete(DeleteBlobDto dto);
}
