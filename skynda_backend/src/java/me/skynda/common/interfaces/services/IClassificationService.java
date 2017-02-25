package me.skynda.common.interfaces.services;

import me.skynda.classification.dto.ClassificationResponseDto;

import java.util.List;

public interface IClassificationService {
    IList<ClassificationResponseDto> getByType(String param);
    IList<ClassificationResponseDto> getByTypeAndVehicleBound(String param);
}
