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

    private CarDtoImageFileToUpload mainImageFile;
    private List<CarDtoImageFileToUpload> imageFiles;
    private List<CarDtoImageFileToUpload> faultsFiles;
}
