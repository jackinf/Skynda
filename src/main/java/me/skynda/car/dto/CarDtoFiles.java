package me.skynda.car.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CarDtoFiles {

    public CarDtoFiles() {
        this.imageFiles = new ArrayList<>();
        this.faultsFiles = new ArrayList<>();
    }

    private List<CarDtoImageFile> imageFiles;
    private List<CarDtoFaultsFile> faultsFiles;

}
