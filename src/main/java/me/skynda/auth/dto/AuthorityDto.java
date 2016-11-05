package me.skynda.auth.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class AuthorityDto {

    private Long id;
    private String name;
}
