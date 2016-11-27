package me.skynda.blobstorage.service;

import com.microsoft.azure.storage.blob.ListBlobItem;
import me.skynda.blobstorage.dto.*;
import me.skynda.blobstorage.dto.response.BlobStorageUploadStreamResponseDto;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.dto.ImageDto;

import java.util.List;

/**
 * Service for managing heavy filesToUpload (blobs) like images and videos.
 */
public interface BlobStorageService {

    boolean createContainer(CreateContainerDto dto);
    boolean deleteContainer(DeleteContainerDto dto);
    boolean upload(UploadBlobDto dto);
    BlobStorageUploadStreamResponseDto uploadStream(UploadBlobDto dto);
    List<ListBlobItem> list(ListBlobsDto dto);
    void download(DownloadBlobDto dto);
    boolean delete(DeleteBlobDto dto);
    Image handleMedia(ImageDto mediaDto, Image existingMedia);

}
