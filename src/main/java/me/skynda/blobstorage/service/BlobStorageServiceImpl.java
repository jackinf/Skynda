package me.skynda.blobstorage.service;

import com.microsoft.azure.storage.CloudStorageAccount;
import com.microsoft.azure.storage.blob.*;

import lombok.SneakyThrows;
import me.skynda.blobstorage.dto.*;

import me.skynda.blobstorage.dto.response.BlobStorageUploadStreamResponseDto;
import me.skynda.common.helper.SkyndaUtility;
import me.skynda.common.interfaces.daos.ImageDao;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.dto.ImageDto;
import me.skynda.vehicle.services.VehicleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
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
public class BlobStorageServiceImpl implements BlobStorageService {

    private final String STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;" +
            "AccountName=portalvhds37rpqq8py1thh;" +
            "AccountKey=Fmwz4WFjCFQYxQesEQ6PVye/m+4OAIJiF6KARMzH3h7GfBUZDTG0U8U33J4kaQR4vP+OwLsZ8+WHN2D9KbX9UA==";

    private CloudStorageAccount storageAccount;

    @Autowired
    ImageDao imageDao;

    public BlobStorageServiceImpl() {
        this(false);
    }

    public BlobStorageServiceImpl(boolean isDevelopment) {
        if (!isDevelopment) {
            try {
                // Retrieve storage account from connection-string.
                storageAccount = CloudStorageAccount.parse(STORAGE_CONNECTION_STRING);
            } catch (URISyntaxException e) {
                e.printStackTrace();
            } catch (InvalidKeyException e) {
                e.printStackTrace();
            }
        }
        else {
            // For using this, install and run Azure Storage Emulator
            // Download Link: https://go.microsoft.com/fwlink/?linkid=717179&clcid=0x409
            storageAccount = CloudStorageAccount.getDevelopmentStorageAccount();
        }
    }

    public boolean createContainer(CreateContainerDto dto) {
        try
        {
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            // Get a reference to a container.
            // The container name must be lower case
            CloudBlobContainer container = blobClient.getContainerReference(dto.getContainerName());

            // Create the container if it does not exist.
            return container.createIfNotExists();
        }
        catch (Exception e)
        {
            // Output the stack trace.
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteContainer(DeleteContainerDto dto) {
        try
        {
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            // Get a reference to a container.
            // The container name must be lower case
            CloudBlobContainer container = blobClient.getContainerReference(dto.getContainerName());

            // Delete the container if it exists.
            return container.deleteIfExists();
        }
        catch (Exception e)
        {
            // Output the stack trace.
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean upload(UploadBlobDto dto) {
        try
        {
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.getContainerReference(dto.getContainerName());    // "mycontainer"

            // Get the file's stream or define the path to a local file.
            File fileSource = dto.getFileSource();  // e.g. new File("C:\\myimages\\myimage.jpg")
            
            // Create or overwrite the "myimage.jpg" blob with contents from a local file.
            CloudBlockBlob blob = container.getBlockBlobReference(dto.getBlobName());   // e.g. "myimage.jpg"
            blob.upload(new FileInputStream(fileSource), fileSource.length());
        }
        catch (Exception e)
        {
            // Output the stack trace.
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public BlobStorageUploadStreamResponseDto uploadStream(UploadBlobDto dto) {
        try
        {
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
        }
        catch (Exception e)
        {
            // Output the stack trace.
            e.printStackTrace();
            return BlobStorageUploadStreamResponseDto.Factory.fail();
        }
    }

    @Override
    public List<ListBlobItem> list(ListBlobsDto dto) {
        List<ListBlobItem> list = new ArrayList<>();
        try
        {
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.getContainerReference(dto.getContainerName());    // e.g. "mycontainer"

            // Loop over blobs within the container and output the URI to each of them.
            for (ListBlobItem blobItem : container.listBlobs()) {
                list.add(blobItem);
//                System.out.println(blobItem.getUri());
            }
        }
        catch (Exception e)
        {
            // Output the stack trace.
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public void download(DownloadBlobDto dto) {
        try
        {
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
        }
        catch (Exception e)
        {
            // Output the stack trace.
            e.printStackTrace();
        }
    }

    @Override
    public boolean delete(DeleteBlobDto dto) {
        try
        {
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.getContainerReference(dto.getContainerName());    // e.g. "mycontainer"

            // Retrieve reference to a blob named "myimage.jpg".
            CloudBlockBlob blob = container.getBlockBlobReference(dto.getBlobName());   // e.g. myimage.jpg

            // Delete the blob.
            return blob.deleteIfExists();
        }
        catch (Exception e)
        {
            // Output the stack trace.
            e.printStackTrace();
        }
        return false;
    }

    /**
     * If image container has base64, then upload to cloud, get new url and save an image. Return new image.
     * If image has only a url, then check if it has changed from previous time, and upload a new one.
     * TODO: Create MediaService and move this method there
     * @param mediaDto - new media file
     * @param existingMedia - already persisted media file
     * @return newly added image to the database
     */
    public Image handleMedia(ImageDto mediaDto, Image existingMedia) {
        if (mediaDto != null) {
            if (mediaDto.getBase64File() != null && !mediaDto.getBase64File().isEmpty()) {
                // Please, upload the fucking file!!!
                UploadBlobDto uploadBlob = new UploadBlobDto();
                uploadBlob.setContainerName(VehicleServiceImpl.DEFAULT_CONTAINER_NAME);
                String blobName = UUID.randomUUID().toString();
                uploadBlob.setBlobName(blobName);
                uploadBlob.setByteArray(SkyndaUtility.toBytearray(mediaDto.getBase64File()));
                BlobStorageUploadStreamResponseDto response = uploadStream(uploadBlob);

                // Was upload successful?
                if (response.isSuccess()) {
                    return imageDao.save(Image.Factory.create(response.getUri(), blobName, VehicleServiceImpl.DEFAULT_CONTAINER_NAME));
                }
            } else if (mediaDto.getUrl() != null && !mediaDto.getUrl().isEmpty()) {
                // Check if url has changed. If not, then presumably the image is the same.
                if (existingMedia != null && !existingMedia.getUrl().trim().isEmpty()) {
                    if (Objects.equals(existingMedia.getUrl(), mediaDto.getUrl())) {
                        return null;    // Url is same. Presumably image did not change. Exit.
                    }
                    // TODO: delete previous image
                }


                // Try saving a new image first.
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
                    } catch (Exception ex) {
                        // TODO: catch and log an exception
                    }
                }
                return newImage;  // save new image and return
            }
        }
        return null;
    }
}
