package me.skynda.vehicle.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Table(name = "vehicle_feature")
public class VehicleFeature implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="archived")
    private Date archived;

    @Column(name="text")
    private String text;

    @Column(name = "vehicle_id", nullable = false)
    private Integer vehicleId;

}
