package me.skynda.vehicle.dto;

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


        public static ImageContainerDto createWithBase64(String base64File) {
            ImageContainerDto dto = new ImageContainerDto();
            dto.setBase64File(base64File);
            return dto;
        }
    }
}
