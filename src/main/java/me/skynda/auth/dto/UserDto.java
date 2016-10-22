package me.skynda.auth.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class UserDto {

	private Long id;
	private String username;
	private String email;
	private String password;
	private Integer enabled;
	
}
