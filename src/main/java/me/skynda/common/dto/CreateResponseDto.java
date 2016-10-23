package me.skynda.common.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateResponseDto {
    private Integer id;
    private boolean success;
    private List<String> errors;
}
