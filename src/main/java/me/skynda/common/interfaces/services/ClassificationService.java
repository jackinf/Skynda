package me.skynda.common.interfaces.services;

import me.skynda.common.dto.request.ClassificationRequestDto;
import me.skynda.common.dto.response.ClassificationResponseDto;

import java.util.List;

public interface ClassificationService {
    List<ClassificationResponseDto> get(ClassificationRequestDto searchDto);
}
