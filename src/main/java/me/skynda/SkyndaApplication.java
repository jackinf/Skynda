package me.skynda;


import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import me.skynda.model.Car;

@SpringBootApplication
@EntityScan(basePackages = { "me.skynda.model" }) 
@EnableJpaRepositories(basePackages = { "me.skynda.repository" })
public class SkyndaApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SkyndaApplication.class, args);
	}
}