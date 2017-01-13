package me.skynda.common.dto;

import lombok.Data;
import org.springframework.validation.ObjectError;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zekar on 1/8/2017.
 */

@Data
public class SimpleResponseDto {

    private boolean success;
    private List<ObjectError> errors;
    private Map<String, String> friendlyErrors;

    public static class Factory {
        public static SimpleResponseDto fail(List<ObjectError> errors) {
            SimpleResponseDto dto = new SimpleResponseDto();
            dto.setSuccess(false);
            dto.setErrors(errors);

            try {
                Map<String, String> friendlyErrors = new LinkedHashMap<>();
                errors.forEach(error -> {
                    if (!friendlyErrors.containsKey(error.getCode()))
                        friendlyErrors.put(error.getCode(), error.getDefaultMessage());
                });
                dto.setFriendlyErrors(friendlyErrors);
            } catch (Exception e) {

            }

            return dto;
        }

        public static SimpleResponseDto success() {
            SimpleResponseDto response = new SimpleResponseDto();
            response.setSuccess(true);
            return response;
        }
    }
}
