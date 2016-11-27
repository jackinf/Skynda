package me.skynda.image.controller;

import me.skynda.common.controller.BaseController;
import me.skynda.common.interfaces.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by ardi-pc on 2016-11-14.
 */
public class ImageController extends BaseController {

    @Autowired
    private ImageService imageService;
}
