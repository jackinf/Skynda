package me.skynda.auth.model;

import lombok.Data;

@Data
public class Response {

    private int code;

    private String message;

    private Error error;

    public Response(int code, String message, Error error) {
        this.code = code;
        this.message = message;
        this.error = error;
    }
}