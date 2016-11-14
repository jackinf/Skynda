package me.skynda.image.services;

import me.skynda.common.interfaces.services.ImageService;
import me.skynda.common.interfaces.daos.ImageDao;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by ardi-pc on 2016-11-14.
 */
public class ImageServiceImpl implements ImageService {
    @Autowired
    ImageDao imageDao;
}
