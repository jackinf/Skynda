package me.skynda.vehicle.entity;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "vehicle_report")
public class VehicleReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @Column(name = "title")
    private String title;

    @Column(name = "is_pass")
    private Boolean isPass;

    @Column(name = "points_text")
    private String pointsText;

}