package me.skynda.common.service;

import me.skynda.common.dao.ClassificationDao;
import me.skynda.common.dto.request.ClassifierRequestDto;
import me.skynda.common.dto.response.ClassifierResponseDto;
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
    public List<ClassifierResponseDto> get(ClassifierRequestDto searchDto) {
        ArrayList<ClassifierResponseDto> dtos = new ArrayList<>();
        dao.getAll().forEach(classificationEntitiy -> {
            ClassifierResponseDto dto = new ClassifierResponseDto();
            dto.setName(classificationEntitiy.getName());
            dto.setValue(classificationEntitiy.getValue());
            dtos.add(dto);
        });
        return dtos;
    }
}
