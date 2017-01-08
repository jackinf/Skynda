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
        return "User " + this.getName() + " (" + this.getEmail() + ") a question: " + this.getHowCanWeHelp();
    }
}
