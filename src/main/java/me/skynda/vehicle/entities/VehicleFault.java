package me.skynda.vehicle.entities;

import lombok.Data;
import me.skynda.image.entities.Image;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Table(name = "vehicle_fault")
public class VehicleFault implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="text")
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id", nullable = false)
    private Image image;

    @Column(name = "vehicle_id", nullable = false)
    private Integer vehicleId;

    @Column(name="archived")
    private Date archived;

}
