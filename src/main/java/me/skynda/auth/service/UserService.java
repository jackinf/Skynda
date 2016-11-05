package me.skynda.auth.service;

import java.util.List;

import me.skynda.auth.dto.UserDto;

public interface UserService {
	
	List<UserDto> getAllUsers();

	UserDto findByEmail(String email);

}
