package me.skynda;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
@ComponentScan(basePackages = {"me.skynda"})
public class SkyndaApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SkyndaApplication.class, args);
	}
	
}