package me.skynda.vehicle.dto;

import lombok.Data;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.entities.Vehicle;

@Data
public class ImageDto {

    private String url;
    private String base64File;
    private String blobName;
    private String containerName;

    private ImageCropInfoDto cropInfo;

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

    /**
     * Helper utilities for images
     */
    public static class Helper {

        /**
         * Checks if Entity image from the database has been changed in relation to dto image (received from user)
         * @param entity - db image
         * @param dto - image received from the form
         * @return - is url not the same?
         */
        public static boolean isUrlChanged(ImageStorable<Image> entity, ImageStorable<ImageDto> dto) {
            if (entity == null) {
                return dto.getImage() != null && dto.getImage().getUrl() != null && dto.getImage().getUrl().trim().isEmpty();
            } else {
                return (entity.getImage() != null && dto.getImage() != null && entity.getImage().getUrl() != null)
                        && (!entity.getImage().getUrl().trim().isEmpty())
                        && (!dto.getImage().getUrl().trim().isEmpty())
                        && entity.getImage().getUrl().equals(dto.getImage().getUrl());
            }
        }
    }
}
