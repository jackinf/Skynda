package me.skynda.auth.controller;

import java.util.List;

import com.google.common.base.Joiner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import me.skynda.auth.config.SecurityUtils;
import me.skynda.auth.dto.UserDto;
import me.skynda.auth.service.UserService;
import me.skynda.common.controller.BaseController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class LoginController extends BaseController {

	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

	@Autowired
	UserService userService;

	@RequestMapping(value = "/user/", method = RequestMethod.GET)
	public ResponseEntity<List<UserDto>> listAllUsers(HttpServletRequest request) {
		logger.info(request.getRemoteAddr() + " - listAllUsers");

		List<UserDto> users = userService.getAllUsers();
		if (users.isEmpty()) {
			logger.info("Got no users");
			return new ResponseEntity<List<UserDto>>(HttpStatus.NO_CONTENT);
		}

		logger.info("Got some users");
		logger.info(users.toString());

		return new ResponseEntity<List<UserDto>>(users, HttpStatus.OK);
	}

	@RequestMapping(value = "/security/account", method = RequestMethod.GET)
	public UserDto getUserAccount() {
		UserDto user = userService.findByLogin(SecurityUtils.getCurrentLogin());
		user.setPassword(null);
		return user;
	}
	
}
