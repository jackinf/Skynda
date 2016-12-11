package me.skynda.subscription.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "subscription")
@Data
public class Subscription {
    @Id
    @Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "archived")
    private Date archived;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "email")
    private String email;

    @Column(name = "user_id")
    private Integer user_id;
}
