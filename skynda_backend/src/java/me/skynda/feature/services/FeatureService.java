package me.skynda.feature.services;

import me.skynda.common.interfaces.daos.IFeatureDao;
import me.skynda.common.interfaces.services.IFeatureService;
import me.skynda.feature.dto.FeatureDto;
import me.skynda.vehicle.services.VehicleService;
import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FeatureService implements IFeatureService {

    private final Mapper mapper;
    private static Logger logger = LoggerFactory.getLogger(VehicleService.class);
    private final IFeatureDao dao;

    public FeatureService(Mapper mapper,IFeatureDao dao) {
        this.mapper = mapper;
        this.dao = dao;
    }

    @Override
    public List<FeatureDto> getAll() {
        try {

            List<FeatureDto> features = dao.getAll()
                    .stream()
                    .map(entity -> mapper.map(entity, FeatureDto.class))
                    .collect(Collectors.toList());
            return features;

        } catch (Exception e) {
            logger.error("getAll failed.", e);
            throw e;
        }
    }
}
