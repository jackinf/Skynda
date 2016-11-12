package me.skynda.vehicle.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import lombok.Data;
import me.skynda.common.entity.Image;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;

@Entity
@Data
@Table(name = "vehicle")
public class Vehicle implements Serializable {

    @Id
    @Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(name="vin_code")
    private String vinCode;

    @NotNull
    @Column(name="price")
    private BigDecimal price;

    @NotNull
    @Column(name="created")
    private Date created;

    @NotNull
    @Column(name="registration_number")
    private String registrationNumber;

    @NotNull
    @Column(name="mileage")
    private BigDecimal mileage;

    @NotEmpty
    @Column(name="color_outside")
    private String colorOutside;

    @NotEmpty
    @Column(name="color_inside")
    private String colorInside;

    @Column(name="fuel_city")
    private String fuelCity;

    @Column(name="fuel_highway")
    private String fuelHighway;

    @Column(name="problems")
    private String problems;

    @Column(name="compression_ration")
    private Integer compressionRatio;

    @Column(name="compression_type")
    private String compressionType;

    @Column(name="configuration")
    private String configuration;

    @Column(name="cylinders")
    private String cylinders;

    @Column(name="displacement")
    private String displacement;

    @Column(name="size")
    private Integer size;

    @Column(name="torque")
    private Integer torque;

    @Column(name="total_valves")
    private Integer totalValves;

    @Column(name="safety_stars")
    private Integer safetyStars;

    @Column(name="additional")
    private String additional;

    @Column(name="archived")
    private Date archived;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "image_id", nullable = false)
    private Image mainImage;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vehicle_model_id", nullable = false)
    @NotNull
    private VehicleModel model;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    private List<VehicleDescription> descriptions;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    private List<VehicleFault> faults;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    private List<VehicleFeature> features;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    private List<VehicleImage> images;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    private List<VehicleReport> reports;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    private List<VehicleReview> reviews;

}