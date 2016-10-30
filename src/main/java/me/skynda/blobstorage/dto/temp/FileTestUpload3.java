package me.skynda.blobstorage.dto.temp;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class FileTestUpload3 {

    private String name;
    private MultipartFile file;
    private List<MultipartFile> files;
}
