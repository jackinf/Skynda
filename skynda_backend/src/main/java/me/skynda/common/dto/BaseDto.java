package me.skynda.common.dto;

import lombok.Data;

import java.util.Date;

@Data
public abstract class BaseDto {
    private Integer id;
    private Date archived;
    private Date created;
    private Date updated;
}
