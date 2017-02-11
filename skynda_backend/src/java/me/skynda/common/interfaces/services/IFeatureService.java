package me.skynda.common.interfaces.services;

import me.skynda.feature.dto.FeatureDto;

import java.util.List;

public interface IFeatureService {
    List<FeatureDto> getAll();
}
