package me.skynda.common.dto;

import lombok.Data;
import org.springframework.validation.ObjectError;

import java.util.List;

@Data
public class CreateResponseDto {
    private Long id;
    private boolean success;
    private List<ObjectError> errors;
}
