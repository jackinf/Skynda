package me.skynda.blobstorage.service;

import lombok.SneakyThrows;
import me.skynda.blobstorage.dto.*;
import me.skynda.blobstorage.dto.response.BlobDto;

import java.nio.file.Paths;
import java.util.List;

import static org.junit.Assert.*;

public class BlobStorageServiceImplTest {
    private final String TEST_CONTAINER_NAME = "test123";
    private BlobStorageServiceImpl service;

    @org.junit.Before
    @SneakyThrows(Exception.class)
    public void setUp() {
        service = new BlobStorageServiceImpl(true);
    }

    @org.junit.Test
    @SneakyThrows(Exception.class)
    public void createContainer() {
        /*
         * ARRANGE
         */
        CreateContainerDto dto = new CreateContainerDto();
        dto.setContainerName(TEST_CONTAINER_NAME);

        /*
         * ACT
         */
        boolean success = service.createContainer(dto);

        /*
         * ASSERT
         */
        assertTrue("Container creating failed", success);
    }

    @org.junit.Test
    @SneakyThrows(Exception.class)
    public void deleteContainer() {
        /*
         * ARRANGE
         */
        DeleteContainerDto dto = new DeleteContainerDto();
        dto.setContainerName(TEST_CONTAINER_NAME);

        /*
         * ACT
         */
        boolean success = service.deleteContainer(dto);

        /*
         * ASSERT
         */
        assertTrue("Container delete failed", success);
    }

    @org.junit.Test
    @SneakyThrows(Exception.class)
    public void upload() {
        /*
         * ARRANGE
         */
        createContainer();

        final String blobName = "readme123.md";
        UploadBlobDto dto = new UploadBlobDto();
        dto.setContainerName(TEST_CONTAINER_NAME);
        dto.setFileSource(Paths.get("README.md").toFile());
        dto.setBlobName(blobName);

        /*
         * ACT
         */
        boolean success = service.upload(dto);

        /*
         * ASSERT
         */
        assertTrue("Upload failed", success);

        /*
         * CLEANUP
         */
        deleteContainer();
    }

    @org.junit.Test
    @SneakyThrows(Exception.class)
    public void list() throws Exception {
        /*
         * ARRANGE
         */
        createContainer();

        final String blobName = "readme123.md";
        UploadBlobDto dto = new UploadBlobDto();
        dto.setContainerName(TEST_CONTAINER_NAME);
        dto.setFileSource(Paths.get("README.md").toFile());
        dto.setBlobName(blobName);
        boolean success = service.upload(dto);
        assertTrue("Upload failed", success);

        /*
         * ACT
         */
        ListBlobsDto listBlobsDto = new ListBlobsDto();
        listBlobsDto.setContainerName(TEST_CONTAINER_NAME);
        List<BlobDto> list = service.list(listBlobsDto);

        /*
         * ASSERT
         */
        assertEquals(1, list.toArray().length); // there should be 1 file

        /*
         * CLEANUP
         */
        deleteContainer();
    }

    @org.junit.Test
    @SneakyThrows(Exception.class)
    public void download() {

    }

//    @org.junit.Test
    @SneakyThrows(Exception.class)
    public void delete() {
        /*
         * ARRANGE
         */
        createContainer();

        final String blobName = "readme123.md";
        UploadBlobDto dto = new UploadBlobDto();
        dto.setContainerName(TEST_CONTAINER_NAME);
        dto.setFileSource(Paths.get("README.md").toFile());
        dto.setBlobName(blobName);
        boolean successfulUpload = service.upload(dto);
        assertTrue("Upload was unsuccessful", successfulUpload);

        /*
         * ACT
         */
        DeleteBlobDto deleteBlobDto = new DeleteBlobDto();
        deleteBlobDto.setContainerName(TEST_CONTAINER_NAME);
        deleteBlobDto.setBlobName(blobName);
        boolean success = service.delete(deleteBlobDto);

        /*
         * ASSERT
         */
        assertTrue("Delete failed", success);

        /*
         * CLEANUP
         */
        deleteContainer();
    }
}