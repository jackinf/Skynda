package me.skynda.subscription.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.NotNull;

@Data
public class SubscribeDto {

    @NotNull
    @Email
    private String email;

    private Boolean isActive;
}
