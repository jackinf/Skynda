package me.skynda.vehicle.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "vehicle_image")
public class VehicleImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;
    private boolean isPrimary;
    private String imageBlobName;
    private String imageContainerName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;
}
