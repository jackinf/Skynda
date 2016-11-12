package me.skynda.vehicle.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "vehicle_fault")
public class VehicleFault {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="text")
    private String text;

    @Column(name="image_id")
    @JoinColumn(name = "image_id", nullable = false)
    private Image image;

    private String imageBlobName;
    private String imageContainerName;

    @Column(name="archived")
    private Date archived;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;
}
