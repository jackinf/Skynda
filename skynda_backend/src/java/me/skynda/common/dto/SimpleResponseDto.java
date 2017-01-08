package me.skynda.common.dto;

import lombok.Data;
import org.springframework.validation.ObjectError;

import java.util.List;

/**
 * Created by zekar on 1/8/2017.
 */

@Data
public class SimpleResponseDto {

    private boolean success;
    private List<ObjectError> errors;

    public static class Factory {
        public static SimpleResponseDto fail(List<ObjectError> errors) {
            SimpleResponseDto dto = new SimpleResponseDto();
            dto.setSuccess(false);
            dto.setErrors(errors);
            return dto;
        }

        public static SimpleResponseDto success() {
            SimpleResponseDto response = new SimpleResponseDto();
            response.setSuccess(true);
            return response;
        }
    }
}
