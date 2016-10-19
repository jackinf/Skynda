package me.skynda.blobstorage.service.tests;

import lombok.SneakyThrows;
import me.skynda.blobstorage.dto.CreateContainerDto;
import me.skynda.blobstorage.dto.DeleteContainerDto;
import me.skynda.blobstorage.dto.UploadBlobDto;
import me.skynda.blobstorage.service.BlobStorageServiceImpl;

import java.nio.file.Paths;

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
        UploadBlobDto dto = new UploadBlobDto();
        dto.setContainerName(TEST_CONTAINER_NAME);
        dto.setFileSource(Paths.get("README.md").toFile());
        dto.setBlobName("readme123.md");

        createContainer();

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

    }

    @org.junit.Test
    @SneakyThrows(Exception.class)
    public void download() {

    }

    @org.junit.Test
    @SneakyThrows(Exception.class)
    public void delete() {

    }
}