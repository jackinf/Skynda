package me.skynda.auth.dto;

import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class UserDto {

	private Long id;
	private String login;
	private String email;
	private String phone;
	private String password;
	private String language;
	private String firstName;
	private String lastName;
	private Boolean enabled;
	private List<AuthorityDto> authority;
	
}
