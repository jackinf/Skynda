package me.skynda.blobstorage.controller;

import com.microsoft.azure.storage.blob.ListBlobItem;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import me.skynda.blobstorage.dto.*;
import me.skynda.blobstorage.service.BlobStorageService;
import me.skynda.car.controller.BaseController;
import me.skynda.common.helper.FileHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Controller for managing media files (blobs)
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/blob")
public class BlobStorageController extends BaseController {

    @Autowired
    private BlobStorageService blobStorageService;

    /**
     * Action for creating blob containers
     *
     * @param dto Settings
     * @return Success
     */
    @RequestMapping(value = "/create_container", method = RequestMethod.POST, produces = "application/json")
    public boolean createContainer(@RequestBody CreateContainerDto dto) {
        return blobStorageService.createContainer(dto);
    }

    /**
     * Action for uploading files
     *
     * @param dto  Settings
     * @param file File
     * @return Success
     */
    @RequestMapping(value = "/upload", method = RequestMethod.POST, consumes = "multipart/form-data", produces = "application/json")
    @ApiOperation(value = "Multipart file upload", notes = "Upload a file to Azure Blob Storage", consumes = "multipart/form-data")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Upload is successful!")})
    public boolean upload(@RequestBody UploadBlobDto dto, @RequestParam("file") MultipartFile file) {
        dto.setFileSource(FileHelper.convert(file));
        return blobStorageService.upload(dto);
    }

    // TODO: for testing file upload. Remove.
    @RequestMapping(value = "/upload1", method = RequestMethod.POST, consumes = "multipart/form-data", produces = "application/json")
    @ApiOperation(value = "Multipart file upload", notes = "Upload a file to Azure Blob Storage", consumes = "multipart/form-data")
    public boolean upload1(@RequestParam(name = "file", required = false) MultipartFile file) {
        return file != null;
    }

    /**
     * Action for listing all the files in the storage
     *
     * @param dto Settings
     * @return All the files in the container
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET, produces = "application/json")
    public List<ListBlobItem> list(@RequestBody ListBlobsDto dto) {
        return blobStorageService.list(dto);
    }

    /**
     * Action for downloading all the files from the container
     *
     * @param dto Settings
     */
    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public void download(@RequestBody DownloadBlobDto dto) {
        blobStorageService.download(dto);
    }

    /**
     * Action for deleting a file from the container
     *
     * @param dto Settings
     * @return Success
     */
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE, produces = "application/json")
    public boolean delete(@RequestBody DeleteBlobDto dto) {
        return blobStorageService.delete(dto);
    }
}
