package me.skynda.vehicle.dto;

import lombok.Data;

/**
 * Created by jevgenir on 12/23/2016.
 */
@Data
public class ImageCropInfoDto {

    /**
     * Do we use the information below to crop the image?
     */
    private boolean crop;

    /**
     * Starting point on a width/x axis
     */
    private float x;

    /**
     * Starting point on a height/y axis
     */
    private float y;

    /**
     * Actual width to crop starting from x.
     */
    private float width;

    /**
     * Actual height to crop starting from y.
     */
    private float height;
}
