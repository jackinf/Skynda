package me.skynda.common.helper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Created by jevgenir on 2/11/2017.
 */
public class JsonHelper {

    public static String toJson(Object object) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            return "<Invalid Json: JsonProcessingException>";
        } catch (Exception e) {
            return "<Invalid Json: unknown error>";
        }
    }
}
