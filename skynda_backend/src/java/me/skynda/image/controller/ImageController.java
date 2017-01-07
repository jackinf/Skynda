package me.skynda.image.controller;

import io.swagger.annotations.ApiOperation;
import me.skynda.common.controller.BaseController;
import me.skynda.common.interfaces.services.ImageService;
import me.skynda.image.dto.ImageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by ardi-pc on 2016-11-14.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/image")
public class ImageController extends BaseController {

    @Autowired
    private ImageService imageService;

    /**
     * Action for listing all the filesToUpload in the storage
     *
     * @param containerName String
     * @return All the filesToUpload in the container
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET, produces = "application/json")
    @ApiOperation(value = "List files", notes = "List all the files", consumes = "application/json")
    public List<ImageDto> list(@RequestParam(name = "containerName", required = false) String containerName) {
        return imageService.list(containerName);
    }

}
