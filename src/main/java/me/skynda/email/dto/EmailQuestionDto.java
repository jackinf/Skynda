package me.skynda.email.dto;

import lombok.Data;
import me.skynda.common.interfaces.dtos.EmailBaseDto;

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
