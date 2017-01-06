package me.skynda.email.dto;

import lombok.Data;

@Data
public class EmailQuestionDto implements EmailBaseDto {

    private String howCanWeHelp;
    private String name;
    private String email;

    @Override
    public String getSender() {
        return this.getEmail();
    }

    @Override
    public String getContent() {
        return "User has a question: " + this.getHowCanWeHelp();
    }
}
