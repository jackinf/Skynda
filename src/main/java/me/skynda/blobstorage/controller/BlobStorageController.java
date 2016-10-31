package me.skynda.blobstorage.controller;

import com.microsoft.azure.storage.blob.ListBlobItem;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import me.skynda.blobstorage.dto.*;
import me.skynda.blobstorage.dto.temp.FileTestUpload3;
import me.skynda.blobstorage.service.BlobStorageService;
import me.skynda.car.controller.BaseController;
import me.skynda.common.helper.FileHelper;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.embedded.ConnectionProperties;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Base64;
import java.util.List;

/**
 * Controller for managing media files (blobs)
 */
//@CrossOrigin(origins = "*")
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


    /*
    ============================
    == UPLOADIMISE TEST actionid
    ============================
     */

    @RequestMapping(value = "/test-upload-1-single", method = RequestMethod.POST, consumes = {"multipart/form-data"})
    @ResponseBody
    public boolean testUpload1(/*  @RequestPart("properties") @Valid ConnectionProperties properties, */
        @RequestParam("file") @Valid @NotNull @NotBlank MultipartFile file) {
        return true;
    }

    /**
     * JavaScript:
     * fetch(`.../api/blob/test-upload-2-multiple`, {
         method: "POST",
         mode: 'no-cors',   // optional
         headers: {"Content-Type": undefined},
         body: formData
         })
     *
     *
     * REQUEST:
     *  KEY 1: Content-Disposition: form-data; name="files"; filename="test1.txt" Content-Type: text/plain
     *  VALUE 1: FormFile
     *
     *  KEY 2: Content-Disposition: form-data; name="files"; filename="test2.txt" Content-Type: text/plain
     *  VALUE 2: FormFile
     *
     * @param request The entire HTTP request. You can get any request param from it
     * @param files form files
     * @return
     */
    @RequestMapping(value = "/test-upload-2-multiple", method = RequestMethod.POST)
    @ResponseBody
    public boolean testUpload2(MultipartHttpServletRequest request, @RequestPart("files") MultipartFile[] files) {
        // Method 1. Getting files from request param
        for (MultipartFile file : files) {
            // Do your stuff...
        }

        // Method 2. Each key is request param, like "files"
        MultiValueMap<String, MultipartFile> multiFileMap = request.getMultiFileMap();

        // Method 3.
        List<MultipartFile> file2 = request.getFiles("files");
        return true;
    }

    @RequestMapping(value = "/test-upload-3-complex", method = RequestMethod.POST)
    @ResponseBody
    public boolean testUpload3(MultipartHttpServletRequest request,
                               @RequestPart("files") MultipartFile[] files,
                               @RequestPart("info") FileTestUpload3 info) {
        for (MultipartFile file : files) {
            // Do your stuff...
        }
//        Base64.getDecoder().decode(encoded)
        return true;
    }

    @RequestMapping(value = "/test-upload-4-complex", method = RequestMethod.PUT)
    @ResponseBody
    public boolean testUpload4(MultipartHttpServletRequest request,
                               @RequestPart("files") MultipartFile[] files,
                               @RequestPart("info") FileTestUpload3 info) {
        for (MultipartFile file : files) {
            // Do your stuff...
        }
        return true;
    }
}
