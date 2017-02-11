package me.skynda.common.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "feature")
public class Feature {

    @Id
    @Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "description")
    private String description;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "value")
    private String value;

    @Column(name = "modifier_user_id")
    private Integer modifierUserId;

    @Column(name = "modifier_user_ip")
    private String modifierUserIp;

    @Column(name = "archived")
    private Date archived;

    @Column(name = "name")
    private String name;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "is_imported")
    private Boolean isImported;
}
