package me.skynda;

import javax.persistence.EntityManagerFactory;

import org.hibernate.SessionFactory;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EntityScan(basePackages = { "me.skynda" })
public class SkyndaApplication {

	@Bean
	public SessionFactory sessionFactory(EntityManagerFactory emf) {
		if (emf.unwrap(SessionFactory.class) == null) {
			throw new NullPointerException("factory is not a hibernate factory");
		}
		return emf.unwrap(SessionFactory.class);
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SkyndaApplication.class, args);
	}

}