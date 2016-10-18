package me.skynda.controller;

import com.microsoft.azure.storage.blob.ListBlobItem;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import me.skynda.dto.blobStorage.request.*;
import me.skynda.helper.FileHelper;
import me.skynda.service.BlobStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/blob")
public class BlobStorageController extends BaseController {

    @Autowired
    private BlobStorageService blobStorageService;

    @RequestMapping(value = "/create_container", method = RequestMethod.POST, produces = "application/json")
    public boolean createContainer(@RequestBody CreateContainerDto dto) {
        return blobStorageService.createContainer(dto);
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST, consumes = "multipart/form-data", produces = "application/json")
    @ApiOperation(value = "Multipart file upload", notes = "Upload a file to Azure Blob Storage", consumes = "multipart/form-data")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Upload is successful!") })
    public boolean upload(@RequestBody UploadBlobDto dto, @RequestParam(name = "file") MultipartFile file) {
        dto.setFileSource(FileHelper.convert(file));
        return blobStorageService.upload(dto);
    }

    // TODO: for testing file upload. Remove.
    @RequestMapping(value = "/upload1", method = RequestMethod.POST, consumes = "multipart/form-data", produces = "application/json")
    @ApiOperation(value = "Multipart file upload", notes = "Upload a file to Azure Blob Storage", consumes = "multipart/form-data")
    public boolean upload1(@RequestParam(name = "file", required = false) MultipartFile file) {
        return file != null;
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET, produces = "application/json")
    public List<ListBlobItem> list(@RequestBody ListBlobsDto dto) { return blobStorageService.list(dto); }

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public void download(@RequestBody DownloadBlobDto dto) { blobStorageService.download(dto); }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE, produces = "application/json")
    public boolean delete(@RequestBody DeleteBlobDto dto) { return blobStorageService.delete(dto); }
}
