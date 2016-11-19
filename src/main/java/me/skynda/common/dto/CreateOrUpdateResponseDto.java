package me.skynda.common.dto;

import lombok.Data;
import org.springframework.validation.ObjectError;

import java.util.ArrayList;
import java.util.List;

@Data
public class CreateOrUpdateResponseDto {
    private Integer id;
    private boolean success;
    private List<ObjectError> errors;

    public static class Factory {
        public static CreateOrUpdateResponseDto fail() {
            CreateOrUpdateResponseDto dto = new CreateOrUpdateResponseDto();
            dto.setSuccess(false);
            return dto;
        }

        public static CreateOrUpdateResponseDto success(Integer id, boolean success) {
            CreateOrUpdateResponseDto response = new CreateOrUpdateResponseDto();
            response.setId(id);
            response.setSuccess(success);
            return response;
        }
    }
}
