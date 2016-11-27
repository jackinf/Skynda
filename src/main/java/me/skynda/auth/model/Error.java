package me.skynda.auth.model;

import lombok.Data;

@Data
public class Error {

    private String reason;

    private String message;

    public Error(String reason, String message) {
        this.reason = reason;
        this.message = message;
    }
}
