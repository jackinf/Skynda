package me.skynda.common.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.net.InetAddress;

@Entity
@Data
@Table(name = "classification_type")
public class ClassificationType implements Serializable {
    @Id
    @Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "modifier_user_id")
    private Integer modifierUserId;

    @Column(name = "modifier_user_ip")
    private String modifierUserIp;
}
