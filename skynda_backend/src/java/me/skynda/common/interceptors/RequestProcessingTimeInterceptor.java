package me.skynda.common.interceptors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * In order to know, how many milliseconds did it take to execute an action.
 */
public class RequestProcessingTimeInterceptor extends HandlerInterceptorAdapter {

    private static Logger logger = LoggerFactory.getLogger(RequestProcessingTimeInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        long startTime = System.currentTimeMillis();
        logger.info(getRequestInfo(request) + ":: Start Time=" + System.currentTimeMillis());
        request.setAttribute("startTime", startTime);
        //if returned false, we need to make sure 'response' is sent
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        System.out.println("Request URL::" + request.getRequestURL().toString()
                + " Sent to Handler :: Current Time=" + System.currentTimeMillis());
        //we can add attributes in the modelAndView and use that in the view page
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        long startTime = (Long) request.getAttribute("startTime");
        logger.info(getRequestInfo(request)
                + ":: End Time=" + System.currentTimeMillis()
                + ":: Time Taken=" + (System.currentTimeMillis() - startTime));
    }

    private String getRequestInfo(HttpServletRequest request) {
        return "Request URL::" + request.getRequestURL().toString()
                + "| Remote Address::" + request.getRemoteAddr()
                + "| Remote User::" + request.getRemoteUser()
                + "| Remote Host::" + request.getRemoteHost()
                + "| Remote Port::" + request.getRemotePort();
    }

}
