package me.skynda.classification.dto;

import lombok.Data;
import me.skynda.common.dto.BaseDto;

import java.util.Date;

/**
 * Created by ardi-pc on 2016-11-13.
 */
@Data
public class ClassificationDto extends BaseDto {
    private String description;

    private Boolean isImported;

    private Integer weight;

    private String value;

    private Integer modifierUserId;

    private String modifierUserIp;

    private Date archived;

    private String name;

    private Boolean isActive;

    private String value2;
}
