package me.skynda.vehicle.dto;

import lombok.Data;

@Data
public class ImageDto {

    private String url;
    private String base64File;
    private String blobName;
    private String containerName;

    public static class Factory {
        public static ImageDto create(String url, String blobName, String containerName) {
            ImageDto dto = new ImageDto();
            dto.setUrl(url);
            dto.setBlobName(blobName);
            dto.setContainerName(containerName);
            return dto;
        }

        public static ImageDto createForDisplay(String url) {
            ImageDto dto = new ImageDto();
            dto.setUrl(url);
            return dto;
        }


        public static ImageDto createWithBase64(String base64File) {
            ImageDto dto = new ImageDto();
            dto.setBase64File(base64File);
            return dto;
        }
    }
}
