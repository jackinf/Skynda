package me.skynda.vehicle.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

// TODO: DELETE
@Data
public class VehicleDtoFilesToUpload {

    public VehicleDtoFilesToUpload() {
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
