package me.skynda.common.interfaces.services;

import me.skynda.image.dto.ImageDto;

import java.util.List;

/**
 * Created by ardi-pc on 2016-11-14.
 */
public interface ImageService {
    List<ImageDto> list(String containerName);
}
