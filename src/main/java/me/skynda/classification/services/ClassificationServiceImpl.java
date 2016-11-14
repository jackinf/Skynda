package me.skynda.classification.services;

import me.skynda.classification.dao.ClassificationDao;
import me.skynda.classification.dto.ClassificationRequestDto;
import me.skynda.classification.dto.ClassificationResponseDto;
import me.skynda.common.interfaces.services.ClassificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ClassificationServiceImpl implements ClassificationService {

    @Autowired
    ClassificationDao dao;

    @Override
    public List<ClassificationResponseDto> get(ClassificationRequestDto searchDto) {
        ArrayList<ClassificationResponseDto> dtos = new ArrayList<>();
        dao.getAll().forEach(classificationEntitiy -> {
            ClassificationResponseDto dto = new ClassificationResponseDto();
            dto.setName(classificationEntitiy.getName());
            dto.setValue(classificationEntitiy.getValue());
            dtos.add(dto);
        });
        return dtos;
    }
}
