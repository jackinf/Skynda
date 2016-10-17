package me.skynda.service;

import com.microsoft.azure.storage.CloudStorageAccount;
import com.microsoft.azure.storage.blob.*;
import me.skynda.dto.blobStorage.request.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Tutorial: https://azure.microsoft.com/en-us/documentation/articles/storage-java-how-to-use-blob-storage/
 */
public class BlobStorageServiceImpl implements BlobStorageService {

    private final String STORAGE_CONNECTION_STRING =
        "DefaultEndpointsProtocol=http;"
        + "AccountName=your_account_name;"
        + "AccountKey=your_account_key";

    public boolean createContainer(CreateContainerDto dto) {
        try
        {
            // Retrieve storage account from connection-string.
            CloudStorageAccount storageAccount = CloudStorageAccount.parse(STORAGE_CONNECTION_STRING);

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

    @Override
    public boolean upload(UploadBlobDto dto) {
        try
        {
            // Retrieve storage account from connection-string.
            CloudStorageAccount storageAccount = CloudStorageAccount.parse(STORAGE_CONNECTION_STRING);

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
    public List<ListBlobItem> list(ListBlobsDto dto) {
        List<ListBlobItem> list = new ArrayList<>();
        try
        {
            // Retrieve storage account from connection-string.
            CloudStorageAccount storageAccount = CloudStorageAccount.parse(STORAGE_CONNECTION_STRING);

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
            // Retrieve storage account from connection-string.
            CloudStorageAccount storageAccount = CloudStorageAccount.parse(STORAGE_CONNECTION_STRING);

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
            // Retrieve storage account from connection-string.
            CloudStorageAccount storageAccount = CloudStorageAccount.parse(STORAGE_CONNECTION_STRING);

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
}
