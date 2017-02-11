package me.skynda;

import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CorsInterceptor  extends HandlerInterceptorAdapter
//public class CorsInterceptor  extends OncePerRequestFilter
{
    public static final String CREDENTIALS_NAME = "Access-Control-Allow-Credentials";
    public static final String ORIGIN_NAME = "Access-Control-Allow-Origin";
    public static final String METHODS_NAME = "Access-Control-Allow-Methods";
    public static final String HEADERS_NAME = "Access-Control-Allow-Headers";
    public static final String MAX_AGE_NAME = "Access-Control-Max-Age";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        response.setHeader(ORIGIN_NAME, request.getHeader("Origin"));
        response.setHeader(CREDENTIALS_NAME, "true");
        response.setHeader(METHODS_NAME, "POST, GET, PUT, OPTIONS, DELETE");
        response.setHeader(MAX_AGE_NAME, "3600");
        response.setHeader(HEADERS_NAME, "Content-Type, Accept, X-Requested-With, remember-me, authorization, xsrf-token");
        return true;
    }

}