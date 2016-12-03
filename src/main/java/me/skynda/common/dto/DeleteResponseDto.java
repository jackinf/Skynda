package me.skynda.common.dto;

import lombok.Data;

@Data
public class DeleteResponseDto {
    private boolean success;
    private String error;

    public static class Factory {
        public static DeleteResponseDto success() {
            DeleteResponseDto dto = new DeleteResponseDto();
            dto.setSuccess(true);
            return dto;
        }

        public static DeleteResponseDto fail(String error) {
            DeleteResponseDto dto = new DeleteResponseDto();
            dto.setSuccess(false);
            dto.setError(error);
            return dto;
        }
    }
}
