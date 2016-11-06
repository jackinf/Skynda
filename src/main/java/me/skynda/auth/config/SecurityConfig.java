package me.skynda.auth.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

	public SecurityConfig() {
        super();
        logger.info("loading SecurityConfig ................................................ ");
    }
	
	@Autowired
	private RestUnauthorizedEntryPoint restAuthenticationEntryPoint;

	@Autowired
	private AccessDeniedHandler restAccessDeniedHandler;

	@Autowired
	private AuthenticationSuccessHandler restAuthenticationSuccessHandler;

	@Autowired
	private AuthenticationFailureHandler restAuthenticationFailureHandler;

//	@Autowired
//	private RememberMeServices rememberMeServices;

	@Autowired
	private UserDetailsService userDetailsService;

	public static final String REMEMBER_ME_KEY = "rememberme_key";
	
	// @Autowired
	// public void configureGlobal(AuthenticationManagerBuilder auth) throws
	// Exception {
	// auth.inMemoryAuthentication().withUser("user").password("password").roles("USER");
	// }

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

//	@Override
//	public void configure(WebSecurity web) throws Exception {
//		web.ignoring().antMatchers("/api/**", "/swagger-ui.html", "**/swagger**", "/index.html", "/login.html", "/partials/**", "/template/**", "/",
//				"/error/**");
//	}

	protected void configure(HttpSecurity http) throws Exception {
//		http.headers().disable().csrf().disable().authorizeRequests()
//
//				.antMatchers("/api").hasAnyAuthority("admin").antMatchers("/users/**").hasAnyAuthority("admin")
//				.anyRequest().authenticated()
////				.antMatchers("/index.html", "/home.html", "/login.html", "/").permitAll()
////				.anyRequest().authenticated()
//				.and().exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint)
//				.accessDeniedHandler(restAccessDeniedHandler).and().formLogin().loginProcessingUrl("/login")
//				.successHandler(restAuthenticationSuccessHandler).failureHandler(restAuthenticationFailureHandler)
//				.usernameParameter("username").passwordParameter("password").permitAll().and().logout()
//				.logoutUrl("/logout").logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
//				.deleteCookies("JSESSIONID").permitAll().and();
		
		http
		.csrf().disable().authorizeRequests()
//		 .antMatchers("/login").permitAll()
			.anyRequest().authenticated()
			.and()
		.formLogin()
//		 .loginPage("/login")
			.and()
		.httpBasic();
		
		
//		http
//		.authorizeRequests()
//		 .antMatchers("/login").permitAll()
//			.anyRequest().authenticated()
//			.and()
//		.formLogin()
//		 .loginPage("/login")
//			.and()
//		.httpBasic();
		
		
		
		// .rememberMe().rememberMeServices(rememberMeServices)
		// .key(REMEMBER_ME_KEY).and();
	}
	
	


}
