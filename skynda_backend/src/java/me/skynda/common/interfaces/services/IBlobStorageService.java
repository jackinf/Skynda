package me.skynda.common.interfaces.services;

import me.skynda.blobstorage.dto.*;
import me.skynda.blobstorage.dto.response.BlobStorageUploadStreamResponseDto;
import me.skynda.blobstorage.dto.response.BlobDto;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.dto.ImageContainerBaseDto;
import me.skynda.vehicle.dto.ImageCropInfoDto;
import me.skynda.vehicle.dto.ImageDto;
import me.skynda.vehicle.dto.VehicleDtoImageFileToDelete;

import java.util.List;

/**
 * Service for managing heavy filesToUpload (blobs) like images and videos.
 */
public interface IBlobStorageService {

    boolean createContainer(CreateContainerDto dto);
    boolean deleteContainer(DeleteContainerDto dto);
    boolean upload(UploadBlobDto dto);
    BlobStorageUploadStreamResponseDto uploadStream(UploadBlobDto dto);
    List<BlobDto> list(ListBlobsDto dto);
    void download(DownloadBlobDto dto);
    boolean delete(DeleteBlobDto dto);

    Image handleMedia(ImageDto mediaDto, Image existingMedia, boolean urlChanged);
    Image handleMedia(ImageDto mediaDto, Image existingMedia);

    byte[] cropImage(byte[] imageInByte, ImageCropInfoDto cropInfo);
    byte[] cropImage(byte[] imageInByte, ImageCropInfoDto cropInfo, String formatName);

    void fromBase64ToUrl(ImageContainerBaseDto dto);
    void tryDeleteBlob(VehicleDtoImageFileToDelete dto);
}
