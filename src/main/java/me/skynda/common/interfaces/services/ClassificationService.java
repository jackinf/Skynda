package me.skynda.common.interfaces.services;

import me.skynda.classification.dto.ClassificationRequestDto;
import me.skynda.classification.dto.ClassificationResponseDto;

import java.util.List;

public interface ClassificationService {
    List<ClassificationResponseDto> getByType(String param);
    List<ClassificationResponseDto> getByTypeAndVehicleBound(String param);
}
