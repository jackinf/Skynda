package me.skynda.car.dto;

import lombok.Data;

@Data
public class CarDtoImageFile {

    private Long id;
    private String base64File;
    private String blobName;
    private String containerName;

}
