package me.skynda.subscription.dto;

import lombok.Data;

@Data
public class SubscribeDto {
    private String email;
    private Boolean isActive;
}
