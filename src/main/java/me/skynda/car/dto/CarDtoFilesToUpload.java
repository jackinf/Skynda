package me.skynda.car.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CarDtoFilesToUpload {

    public CarDtoFilesToUpload() {
        this.imageFiles = new ArrayList<>();
        this.faultsFiles = new ArrayList<>();
    }

    /**
     * Base64 image file
     */
    private String mainImageFile;

    /**
     * Base64 image files
     */
    private List<String> imageFiles;

    /**
     * Data transfer objects, which hold Base64 image files and ids
     */
    private List<CarDtoImageFileToUpload> faultsFiles;
}
