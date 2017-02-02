package me.skynda.classification.services;

import me.skynda.common.interfaces.daos.IClassificationDao;
import me.skynda.classification.dto.ClassificationResponseDto;
import me.skynda.common.interfaces.services.IClassificationService;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ClassificationService implements IClassificationService {

    @Autowired
    IClassificationDao dao;

    @Autowired
    Mapper mapper;

    @Override
    public List<ClassificationResponseDto> getByType(String type) {
        ArrayList<ClassificationResponseDto> dtos = new ArrayList<>();
        dao.getByType(type).forEach(classificationEntity -> {
            ClassificationResponseDto dto = mapper.map(classificationEntity, ClassificationResponseDto.class);
            dtos.add(dto);
        });
        return dtos;
    }

    @Override
    public List<ClassificationResponseDto> getByTypeAndVehicleBound(String type) {
        ArrayList<ClassificationResponseDto> dtos = new ArrayList<>();
        dao.getByTypeAndVehicleBound(type).forEach(classificationEntity -> {
            ClassificationResponseDto dto = mapper.map(classificationEntity, ClassificationResponseDto.class);
            dtos.add(dto);
        });
        return dtos;
    }
}
