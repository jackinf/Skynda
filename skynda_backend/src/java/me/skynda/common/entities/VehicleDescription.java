package me.skynda.common.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Table(name = "vehicle_description")
public class VehicleDescription implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="title")
    private String title;

    @Column(name="content")
    private String content;

    @Column(name="archived")
    private Date archived;

    @Column(name = "vehicle_id", nullable = false)
    private Integer vehicleId;

}
