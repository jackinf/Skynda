package me.skynda.vehicle.entity;

import javax.persistence.*;

import lombok.Data;

import java.io.Serializable;

@Entity
@Data
@Table(name = "vehicle_report")
public class VehicleReport implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "is_pass")
    private Boolean isPass;

    @Column(name = "points_text")
    private String pointsText;

    @Column(name = "vehicle_id", nullable = false)
    private Integer vehicleId;

}