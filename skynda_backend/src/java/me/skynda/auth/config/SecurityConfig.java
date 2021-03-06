package me.skynda.auth.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

    public SecurityConfig() {
        super();
        logger.info("loading SecurityConfig ................................................ ");
    }

    public static final String CREDENTIALS_NAME = "Access-Control-Allow-Credentials";
    public static final String ORIGIN_NAME = "Access-Control-Allow-Origin";
    public static final String METHODS_NAME = "Access-Control-Allow-Methods";
    public static final String HEADERS_NAME = "Access-Control-Allow-Headers";
    public static final String MAX_AGE_NAME = "Access-Control-Max-Age";


    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private RestUnauthorizedEntryPoint restAuthenticationEntryPoint;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private AccessDeniedHandler restAccessDeniedHandler;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private AuthenticationSuccessHandler restAuthenticationSuccessHandler;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private AuthenticationFailureHandler restAuthenticationFailureHandler;

//	@Autowired
//	private RememberMeServices rememberMeServices;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private UserDetailsService userDetailsService;

    public static final String REMEMBER_ME_KEY = "rememberme_key";

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll() // allow CORS option calls

                /*
                    Vehicle controller
                 */
                .antMatchers(HttpMethod.GET, "/api/vehicles", "/api/vehicle/{\\d+}/detailed").permitAll()
                .antMatchers(HttpMethod.POST, "/api/vehicle/search").permitAll()

                /*
                    Vehicle model controller
                 */
                .antMatchers(HttpMethod.GET, "/api/vehicle-models", "/api/vehicle-models-by-manufacturers/", "/api/vehicle-model/{\\d+}").permitAll()

                /*
                    Email controller
                 */
                .antMatchers(HttpMethod.POST, "/api/email/subscribe", "/api/email/sell-vehicle",
                        "/api//email/question", "/api/email/buy-vehicle").permitAll()

                /*
                    Subscribe controller
                 */
                .antMatchers(HttpMethod.POST, "/api/subscribe").permitAll()

                /*
                    BlobStorage controller
                 */
                .antMatchers("/api/blob").authenticated() //.hasAuthority("admin")

                /*
                    Classifier controller
                 */
                .antMatchers(HttpMethod.GET, "/api/classifications/{\\s+}", "/api/classifications/{\\s+}/vehicle-bound").permitAll()

                /*
                    Other controllers
                 */
                .antMatchers("/api/**").authenticated()    // other requests are required to be authenticated
            .and()
                .formLogin()
                .and()
            .httpBasic()
                .and()
            .headers()
                .addHeaderWriter((request, response) -> {
                    response.setHeader(ORIGIN_NAME, request.getHeader("Origin"));
                    response.setHeader(CREDENTIALS_NAME, "true");
                    response.setHeader(METHODS_NAME, "POST, GET, PUT, OPTIONS, DELETE");
                    response.setHeader(MAX_AGE_NAME, "3600");
                    response.setHeader(HEADERS_NAME, "Content-Type, Accept, X-Requested-With, remember-me");
                });
    }
}
