package me.skynda.blobstorage.dto.response;

import lombok.Data;

@Data
public class BlobStorageUploadStreamResponseDto {

    private boolean success;

    /**
     * If file upload is successful, this field should be filled
     */
    private String uri;

    public static class Factory {
        public static BlobStorageUploadStreamResponseDto succeed(String uri) {
            BlobStorageUploadStreamResponseDto dto = new BlobStorageUploadStreamResponseDto();
            dto.setSuccess(true);
            dto.setUri(uri);
            return dto;
        }

        public static BlobStorageUploadStreamResponseDto fail() {
            BlobStorageUploadStreamResponseDto dto = new BlobStorageUploadStreamResponseDto();
            dto.setSuccess(false);
            return dto;
        }
    }
}
