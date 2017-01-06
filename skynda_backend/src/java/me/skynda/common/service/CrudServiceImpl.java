package me.skynda.common.service;

import lombok.SneakyThrows;
import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.common.dto.BaseDto;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.entities.BaseEntity;
import org.apache.commons.lang3.NotImplementedException;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jevgenir on 12/4/2016.
 */
public abstract class CrudServiceImpl<T extends BaseEntity> {

    private Class<T> clazz;

   protected CrudServiceImpl(Class<T> clazz) {
        this.clazz = clazz;
    }

    @Autowired
    private SkyndaBaseEntityDao<T> dao;

    @Autowired
    private Mapper mapper;

    public <TRequest extends BaseDto, TResponse extends BaseDto> List<TResponse> getAll(TRequest dto) {
        List<TResponse> responseDtos = new ArrayList<>();
        dao.getAll().forEach(entity -> {
            throw new NotImplementedException("not implemented");
//            TResponse responseDto = mapper.map(entity, clazz.getClass());
//            responseDtos.add(responseDto);
        });
        return responseDtos;
    }

    public BaseDto get(Integer id, Class dtoClass) {
        T entity = dao.get(id);
        throw new NotImplementedException("not implemented");
//        return mapper.map(entity, dtoClass);
    }

    @SneakyThrows(IllegalAccessException.class)
    public <TU extends BaseDto> CreateOrUpdateResponseDto createOrUpdate(TU dto, BindingResult bindingResult)
            throws IllegalAccessException, InstantiationException {
        /*
            Create new or load existing
         */
        T entity;
        if (dto.getId() != null) {
            entity = dao.get(dto.getId());
            mapper.map(dao, entity);
        } else {
            T newEntity = clazz.newInstance();
            mapper.map(dto, newEntity);
            entity = newEntity;
        }

        /*
            Save and return response
         */
        T persistedEntity = dao.saveOrUpdate(entity);
        return CreateOrUpdateResponseDto.Factory.success(persistedEntity.getId(), true);
    }

    public DeleteResponseDto delete(Integer id) {
        dao.delete(id);
        return DeleteResponseDto.Factory.success();
    }

}
