package me.skynda.auth.service;

import java.util.ArrayList;
import java.util.List;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import me.skynda.auth.dao.UserDao;
import me.skynda.auth.dto.UserDto;
import me.skynda.auth.model.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	UserDao userDao;
	
	@Override
	public List<UserDto> getAllUsers() {
		List<UserDto> userDtoList = new ArrayList<UserDto>();
		Mapper mapper = new DozerBeanMapper();
		userDao.getAll().forEach(c -> {
			UserDto userDto = new UserDto();
			userDto = mapper.map(c, UserDto.class);
			userDtoList.add(userDto);
        });
		return userDtoList;
	}

	@Override
	public UserDto findByEmail(String email) {
		Mapper mapper = new DozerBeanMapper();
		User user = userDao.getByEmail(email);
		UserDto userDto = new UserDto();
		userDto = mapper.map(user, UserDto.class);
		return userDto;
	}


}
