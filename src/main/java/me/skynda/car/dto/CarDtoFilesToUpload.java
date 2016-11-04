package me.skynda.car.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

// TODO: DELETE
@Data
public class CarDtoFilesToUpload {

    public CarDtoFilesToUpload() {
        this.imageFiles = new ArrayList<>();
    }

    /**
     * Base64 image file
     */
    private String mainImageFile;

    /**
     * Base64 image files
     */
    private List<String> imageFiles;
}
