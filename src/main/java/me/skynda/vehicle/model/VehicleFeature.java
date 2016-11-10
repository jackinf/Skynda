package me.skynda.vehicle.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "vehicle_feature")
public class VehicleFeature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;
}
