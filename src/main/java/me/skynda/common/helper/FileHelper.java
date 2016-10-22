package me.skynda.common.helper;

import lombok.SneakyThrows;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileHelper {

    /**
     * Converts uploaded MultipartFile to File
     *
     * @param file Multipart file
     * @return File
     */
    @SneakyThrows(IOException.class)
    public static File convert(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        convertedFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convertedFile);
        fos.write(file.getBytes());
        fos.close();
        return convertedFile;
    }

}
