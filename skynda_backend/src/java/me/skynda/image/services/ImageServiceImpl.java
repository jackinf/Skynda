package me.skynda.image.services;

import me.skynda.common.interfaces.daos.IImageDao;
import me.skynda.common.interfaces.services.ImageService;
import me.skynda.image.dto.ImageDto;
import me.skynda.image.entities.Image;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by ardi-pc on 2016-11-14.
 */
@Service
@Transactional
public class ImageServiceImpl implements ImageService {

    @Autowired
    IImageDao imageDao;

    @Autowired
    private Mapper mapper;

    @Override
    public List<ImageDto> list(String containerName) {
        Stream<Image> imageStream = imageDao.getAll().parallelStream();
        if (containerName != null && !containerName.equals(""))
            imageStream = imageStream.filter(image -> {
                String imageContainerName = image.getContainerName();
                return imageContainerName != null && !imageContainerName.equals("") && image.getContainerName().equals(containerName);
            });
        return imageStream.map(image -> mapper.map(image, ImageDto.class)).collect(Collectors.toList());
    }
}
