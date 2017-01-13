package me.skynda.email.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class EmailQuestionDto implements EmailBaseDto {


    @NotNull
    @NotEmpty
    @Size(min = 5, max = 500)
    private String howCanWeHelp;

    @NotNull
    @NotEmpty
    @Size(min = 2, max = 25)
    private String name;

    @Email
    @NotNull
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
