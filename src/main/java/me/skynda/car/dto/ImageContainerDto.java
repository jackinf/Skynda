package me.skynda.car.dto;

import lombok.Data;

@Data
public class ImageContainerDto {

    private String imageUrl;
    private String base64File;
    private String blobName;
    private String containerName;

    public static class Factory {
        public static ImageContainerDto create(String url, String blobName, String containerName) {
            ImageContainerDto dto = new ImageContainerDto();
            dto.setImageUrl(url);
            dto.setBlobName(blobName);
            dto.setContainerName(containerName);
            return dto;
        }

        public static ImageContainerDto createForDisplay(String url) {
            ImageContainerDto dto = new ImageContainerDto();
            dto.setImageUrl(url);
            return dto;
        }
    }
}
