package me.skynda.vehicle.entities;

import lombok.Data;
import me.skynda.classification.entities.Classification;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feature_id", nullable = false)
    private Classification feature;

    @Column(name = "vehicle_id", nullable = false)
    private Integer vehicleId;

}
