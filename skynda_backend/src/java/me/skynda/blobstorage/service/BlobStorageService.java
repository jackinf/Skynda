package me.skynda.blobstorage.service;

import com.microsoft.azure.storage.CloudStorageAccount;
import com.microsoft.azure.storage.blob.*;

import lombok.SneakyThrows;
import me.skynda.blobstorage.dto.*;

import me.skynda.blobstorage.dto.response.BlobStorageUploadStreamResponseDto;
import me.skynda.blobstorage.dto.response.BlobDto;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.helper.SkyndaUtility;
import me.skynda.common.interfaces.daos.IImageDao;
import me.skynda.common.interfaces.services.IBlobStorageService;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.dao.VehicleDao;
import me.skynda.vehicle.dto.ImageContainerBaseDto;
import me.skynda.vehicle.dto.ImageCropInfoDto;
import me.skynda.vehicle.dto.ImageDto;
import me.skynda.vehicle.dto.VehicleDtoImageFileToDelete;
import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

/**
 * Tutorial: https://azure.microsoft.com/en-us/documentation/articles/storage-java-how-to-use-blob-storage/
 */
@Service
@Transactional
public class BlobStorageService implements IBlobStorageService {

    private CloudStorageAccount storageAccount;
    private static String DEFAULT_CONTAINER_NAME = "skynda";
    private IImageDao imageDao;
    private Mapper mapper;

    private static Logger logger = LoggerFactory.getLogger(BlobStorageService.class);

    @Autowired
    public BlobStorageService(Mapper mapper, IImageDao imageDao) {
        this(false, mapper, imageDao);
    }

    public BlobStorageService(boolean isDevelopment, Mapper mapper, IImageDao imageDao) {

        this.mapper = mapper;
        this.imageDao = imageDao;

        if (!isDevelopment) {
            try {
                // Retrieve storage account from connection-string.
                String STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;" +
                        "AccountName=portalvhds37rpqq8py1thh;" +
                        "AccountKey=Fmwz4WFjCFQYxQesEQ6PVye/m+4OAIJiF6KARMzH3h7GfBUZDTG0U8U33J4kaQR4vP+OwLsZ8+WHN2D9KbX9UA==";
                storageAccount = CloudStorageAccount.parse(STORAGE_CONNECTION_STRING);
            } catch (URISyntaxException | InvalidKeyException e) {
                logger.error("constructor", e);
                e.printStackTrace();
            }
        } else {
            // For using this, install and run Azure Storage Emulator
            // Download Link: https://go.microsoft.com/fwlink/?linkid=717179&clcid=0x409
            storageAccount = CloudStorageAccount.getDevelopmentStorageAccount();
        }
    }

    public boolean createContainer(CreateContainerDto dto) {
        try {
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            // Get a reference to a container.
            // The container name must be lower case
            CloudBlobContainer container = blobClient.getContainerReference(dto.getContainerName());

            // Create the container if it does not exist.
            return container.createIfNotExists();
        } catch (Exception e) {
            // Output the stack trace.
            logger.error("createContainer, dto: " + JsonHelper.toJson(dto), e);
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteContainer(DeleteContainerDto dto) {
        try {
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            // Get a reference to a container.
            // The container name must be lower case
            CloudBlobContainer container = blobClient.getContainerReference(dto.getContainerName());

            // Delete the container if it exists.
            return container.deleteIfExists();
        } catch (Exception e) {
            // Output the stack trace.
            logger.error("deleteContainer, dto: " + JsonHelper.toJson(dto), e);
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean upload(UploadBlobDto dto) {
        try {
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.getContainerReference(dto.getContainerName());    // "mycontainer"

            // Get the file's stream or define the path to a local file.
            File fileSource = dto.getFileSource();  // e.g. new File("C:\\myimages\\myimage.jpg")

            // Create or overwrite the "myimage.jpg" blob with contents from a local file.
            CloudBlockBlob blob = container.getBlockBlobReference(dto.getBlobName());   // e.g. "myimage.jpg"
            blob.upload(new FileInputStream(fileSource), fileSource.length());
        } catch (Exception e) {
            // Output the stack trace.
            logger.error("upload, dto: " + JsonHelper.toJson(dto), e);
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public BlobStorageUploadStreamResponseDto uploadStream(UploadBlobDto dto) {
        try {
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.getContainerReference(dto.getContainerName());    // "mycontainer"

            // Get the file's stream or define the path to a local file.
            byte[] byteArray = dto.getByteArray();
            ByteArrayInputStream bis = new ByteArrayInputStream(byteArray);

            // Create or overwrite the "myimage.jpg" blob with contents from a local file.
            CloudBlockBlob blob = container.getBlockBlobReference(dto.getBlobName());   // e.g. "myimage.jpg"
            blob.upload(bis, byteArray.length);
            return BlobStorageUploadStreamResponseDto.Factory.succeed(blob.getUri().toString());
        } catch (Exception e) {
            // Output the stack trace.
            logger.error("uploadStream, dto: " + JsonHelper.toJson(dto), e);
            e.printStackTrace();
            return BlobStorageUploadStreamResponseDto.Factory.fail();
        }
    }

    @Override
    public List<BlobDto> list(ListBlobsDto dto) {
        List<BlobDto> list = new ArrayList<>();
        try {
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.getContainerReference(dto.getContainerName());    // e.g. "mycontainer"

            // Loop over blobs within the container and output the URI to each of them.
            for (ListBlobItem blobItem : container.listBlobs()) {
                list.add(mapper.map(blobItem, BlobDto.class));
//                System.out.println(blobItem.getUri());
            }
        } catch (Exception e) {
            // Output the stack trace.
            logger.error("list, dto: " + JsonHelper.toJson(dto), e);
            e.printStackTrace();
        }

        return list;
    }

    @Override
    public void download(DownloadBlobDto dto) {
        try {
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.getContainerReference(dto.getContainerName());    // e.g. "mycontainer"

            // Loop through each blob item in the container.
            for (ListBlobItem blobItem : container.listBlobs()) {
                // If the item is a blob, not a virtual directory.
                if (blobItem instanceof CloudBlob) {
                    // Download the item and save it to a file with the same name.
                    CloudBlob blob = (CloudBlob) blobItem;

                    // TODO: Return only stream?.. or download file immediately
                    blob.download(new FileOutputStream("C:\\mydownloads\\" + blob.getName()));
                }
            }
        } catch (Exception e) {
            // Output the stack trace.
            logger.error("download, dto: " + JsonHelper.toJson(dto), e);
            e.printStackTrace();
        }
    }

    @Override
    public boolean delete(DeleteBlobDto dto) {
        try {
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.getContainerReference(dto.getContainerName());    // e.g. "mycontainer"

            // Retrieve reference to a blob named "myimage.jpg".
            CloudBlockBlob blob = container.getBlockBlobReference(dto.getBlobName());   // e.g. myimage.jpg

            // Delete the blob.
            return blob.deleteIfExists();
        } catch (Exception e) {
            // Output the stack trace.
            logger.error("delete, dto: " + JsonHelper.toJson(dto), e);
            e.printStackTrace();
        }
        return false;
    }

    public Image handleMedia(ImageDto mediaDto, Image existingMedia) {
        // Check if url has changed. If not, then presumably the image is the same.
        boolean urlHasChanged = existingMedia != null && !existingMedia.getUrl().trim().isEmpty()
                && Objects.equals(existingMedia.getUrl(), mediaDto.getUrl());

        return handleMedia(mediaDto, existingMedia, urlHasChanged);
    }

    /**
     * If image container has base64, then upload to cloud, get new url and save an image. Return new image.
     * If image has only a url, then check if it has changed from previous time, and upload a new one.
     * TODO: Create MediaService and move this method there
     *
     * @param mediaDto      - new media file
     * @param existingMedia - already persisted media file
     * @return newly added image to the database or existing image
     */
    public Image handleMedia(ImageDto mediaDto, Image existingMedia, boolean urlChanged) {
        if (mediaDto == null) {
            return null;
        }

        if (mediaDto.getBase64File() != null && !mediaDto.getBase64File().isEmpty()) {
            // Please, upload the media file
            UploadBlobDto uploadBlob = new UploadBlobDto();
            uploadBlob.setContainerName(DEFAULT_CONTAINER_NAME);
            String blobName = UUID.randomUUID().toString();
            uploadBlob.setBlobName(blobName);

            byte[] bytes = SkyndaUtility.toBytearray(mediaDto.getBase64File());
            bytes = cropImage(bytes, mediaDto.getCropInfo());
            uploadBlob.setByteArray(bytes);
            BlobStorageUploadStreamResponseDto response = uploadStream(uploadBlob);

            // Was upload successful?
            if (response.isSuccess()) {
                return imageDao.save(Image.Factory.create(response.getUri(), blobName, DEFAULT_CONTAINER_NAME));
            } else {
                return existingMedia;   // fail
            }
        }

        // We made it here, meaning, that uploaded file was not base64. Check if uploaded file has at least url.
        if (mediaDto.getUrl() == null || mediaDto.getUrl().trim().isEmpty()) {
            return null;    // otherwise assume that the file is deleted
        }

        if (urlChanged) {
            return existingMedia;    // Url is same. Presumably image did not change. Exit.
        }

        // Save the new file
        Image newImage = imageDao.save(Image.Factory.create(mediaDto.getUrl()));

         /*
             Cleanup existing image from azure cloud:
             use blob name + container name to delete image
         */
        if (existingMedia != null
                && existingMedia.getBlobName() != null
                && !existingMedia.getBlobName().isEmpty()
                && existingMedia.getContainerName() != null
                && !existingMedia.getContainerName().isEmpty()) {

            try {
                DeleteBlobDto deleteBlob = new DeleteBlobDto();
                deleteBlob.setBlobName(existingMedia.getBlobName());
                deleteBlob.setContainerName(existingMedia.getContainerName());
                delete(deleteBlob);

                // TODO: delete previous image and continue function execution -> imageDao.deleteByUrl
            } catch (Exception ex) {
                logger.error("handleMedia, mediaDto: " + JsonHelper.toJson(mediaDto) + ", existingMedia: " + JsonHelper.toJson(existingMedia), ex);
            }
        }
        return newImage;  // save new image and return
    }

    public byte[] cropImage(byte[] imageInByte, ImageCropInfoDto cropInfo) {
        return cropImage(imageInByte, cropInfo, "jpg");
    }

    /***
     * Crops the image
     * @param imageInByte image in bytes
     * @param cropInfo crop information
     * @param formatName format type
     * @return Cropped image in bytes.
     */
    @SneakyThrows(IOException.class)
    public byte[] cropImage(byte[] imageInByte, ImageCropInfoDto cropInfo, String formatName) {
        if (cropInfo == null || !cropInfo.isCrop())
            return imageInByte; // do not crop the image

        // Convert bytes to Buffered image
        InputStream in = new ByteArrayInputStream(imageInByte);
        BufferedImage bImageFromConvert = ImageIO.read(in);

        // Actual crop
        BufferedImage subImage = bImageFromConvert.getSubimage(300, 150, 200, 200);

        // Convert back buffered image to bytes
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(subImage, formatName, baos );
        baos.flush();
        byte[] subimageInByte = baos.toByteArray();
        baos.close();

        return subimageInByte;
    }

    /***
     * Upload faults' images.
     * @param dto Images dto.
     */
    public void fromBase64ToUrl(ImageContainerBaseDto dto) {
        String faultBase64File = dto.getImage() != null
                ? dto.getImage().getBase64File()
                : null;

        if (faultBase64File == null || faultBase64File.isEmpty())
            return;

        // Upload the file, Jim!
        UploadBlobDto uploadBlobDto = new UploadBlobDto();
        uploadBlobDto.setContainerName(DEFAULT_CONTAINER_NAME);
        String blobName = UUID.randomUUID().toString();
        uploadBlobDto.setBlobName(blobName);
        uploadBlobDto.setByteArray(SkyndaUtility.toBytearray(faultBase64File));
        BlobStorageUploadStreamResponseDto responseDto = uploadStream(uploadBlobDto);

        // File upload successful, Jim, isn't it?
        if (responseDto.isSuccess()) {
            dto.getImage().setUrl(responseDto.getUri());
            dto.getImage().setBlobName(blobName);
            dto.getImage().setContainerName(DEFAULT_CONTAINER_NAME);
            dto.getImage().setBase64File(null);
        }
    }


    public void tryDeleteBlob(VehicleDtoImageFileToDelete dto) {
        if (dto == null || dto.getBlobName() == null || dto.getBlobName().isEmpty())
            return;

        String blobName = dto.getBlobName();
        String containerName = dto.getContainerName() != null ? DEFAULT_CONTAINER_NAME : dto.getContainerName();

        try {
            DeleteBlobDto deleteBlobDto = new DeleteBlobDto();
            deleteBlobDto.setBlobName(blobName);
            deleteBlobDto.setContainerName(containerName);
            delete(deleteBlobDto);
        } catch (Exception ex) {
            logger.error("handleMedia, dto: " + JsonHelper.toJson(dto), ex);
        }
    }

}
