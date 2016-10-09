package me.skynda;

import javax.persistence.EntityManagerFactory;

import org.hibernate.SessionFactory;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EntityScan(basePackages = { "me.skynda" })
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class})
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