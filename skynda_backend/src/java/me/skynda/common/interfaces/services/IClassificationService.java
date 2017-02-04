package me.skynda.common.interfaces.services;

import me.skynda.classification.dto.ClassificationResponseDto;

import java.util.List;

public interface IClassificationService {
    List<ClassificationResponseDto> getByType(String param);
    List<ClassificationResponseDto> getByTypeAndVehicleBound(String param);
}
