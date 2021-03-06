package me.skynda.common.entities;

import lombok.Data;
import me.skynda.image.entities.Image;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Table(name = "vehicle_image")
public class VehicleImage implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="archived")
    private Date archived;

    @Column(name = "vehicle_id", nullable = false)
    private Integer vehicleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id", nullable = false)
    private Image image;
}
