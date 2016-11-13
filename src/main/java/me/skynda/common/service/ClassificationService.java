package me.skynda.common.service;

import me.skynda.common.dto.request.ClassifierRequestDto;
import me.skynda.common.dto.response.ClassifierResponseDto;

import java.util.List;

public interface ClassificationService {
    List<ClassifierResponseDto> get(ClassifierRequestDto searchDto);
}
