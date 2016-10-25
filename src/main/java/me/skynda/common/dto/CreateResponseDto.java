package me.skynda.common.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateResponseDto {
    private Long id;
    private boolean success;
    private List<String> errors;
}
