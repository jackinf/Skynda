package me.skynda.car.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CarDtoFilesToDelete {

    public CarDtoFilesToDelete() {
        this.imageFiles = new ArrayList<>();
        this.faultsFiles = new ArrayList<>();
    }

    private CarDtoImageFileToDelete mainImageFile;
    private List<CarDtoImageFileToDelete> imageFiles;
    private List<CarDtoImageFileToDelete> faultsFiles;

}
