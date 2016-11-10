package me.skynda.vehicle.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "vehicle_fault")
public class VehicleFault {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    private String imageUrl;
    private String imageBlobName;
    private String imageContainerName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;
}
