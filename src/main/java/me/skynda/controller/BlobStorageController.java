package me.skynda.controller;

import com.microsoft.azure.storage.blob.ListBlobItem;
import me.skynda.dto.blobStorage.request.*;
import me.skynda.service.BlobStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/api/blob")
public class BlobStorageController extends BaseController {

    @Autowired
    private BlobStorageService blobStorageService;

    @RequestMapping(value = "/create_container")
    public boolean createContainer(@RequestBody CreateContainerDto dto) {
        return blobStorageService.createContainer(dto); }

    @RequestMapping(value = "/upload")
    public boolean upload(@RequestBody UploadBlobDto dto) { return blobStorageService.upload(dto); }

    @RequestMapping(value = "/list")
    public List<ListBlobItem> list(@RequestBody ListBlobsDto dto) { return blobStorageService.list(dto); }

    @RequestMapping(value = "/download")
    public void download(@RequestBody DownloadBlobDto dto) { blobStorageService.download(dto); }

    @RequestMapping(value = "/delete")
    public boolean delete(@RequestBody DeleteBlobDto dto) { return blobStorageService.delete(dto); }
}
