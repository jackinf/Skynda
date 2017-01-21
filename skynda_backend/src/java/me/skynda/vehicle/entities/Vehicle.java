package me.skynda.vehicle.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import lombok.Data;
import me.skynda.classification.entities.Classification;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.dto.ImageStorable;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;

@Entity
@Table(name = "vehicle")
@Data
public class Vehicle implements Serializable, ImageStorable<Image> {

    @Id
    @Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotEmpty
    @Column(name = "vin_code")
    private String vinCode;

    @NotNull
    @Column(name = "price")
    private BigDecimal price;

    @NotNull
    @Column(name = "created")
    private Date created;

    @NotNull
    @Column(name = "registration_number")
    private String registrationNumber;

    @NotNull
    @Column(name = "mileage")
    private BigDecimal mileage;

    @Column(name = "color_outside_hex")
    private String colorOutsideHex;

    @Column(name = "color_inside_hex")
    private String colorInsideHex;

    @Column(name = "fuel_city")
    private BigDecimal fuelCity;

    @Column(name = "fuel_highway")
    private BigDecimal fuelHighway;

    @Column(name = "problems")
    private String problems;

    @Column(name = "compression_ratio")
    private Integer compressionRatio;

    @Column(name = "compression_type")
    private String compressionType;

    @Column(name = "configuration")
    private String configuration;

    @Column(name = "cylinders")
    private String cylinders;

    @Column(name = "displacement")
    private String displacement;

    @Column(name = "size")
    private Integer size;

    @Column(name = "torque")
    private Integer torque;

    @Column(name = "total_valves")
    private Integer totalValves;

    @Column(name = "safety_stars")
    @Range(min = 1, max = 5)
    private Integer safetyStars;

    @Column(name = "safety_url")
    private String safetyUrl;

    @Column(name = "additional")
    private String additional;

    @Column(name = "archived")
    private Date archived;

    @Column(name = "owner_id")
    private Integer ownerId;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "image_id", nullable = false)
    @NotNull
    private Image mainImage;

    @OneToMany(mappedBy = "vehicleId", fetch = FetchType.LAZY)
    private List<VehicleImage> images;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_model_id", nullable = false)
    @NotNull
    private VehicleModel model;

    @OneToMany(mappedBy = "vehicleId", fetch = FetchType.LAZY)
    private List<VehicleDescription> descriptions;

    @OneToMany(mappedBy = "vehicleId", fetch = FetchType.LAZY)
    private List<VehicleFault> faults;

    @OneToMany(mappedBy = "vehicleId", fetch = FetchType.LAZY)
    private List<VehicleFeature> features;

    @OneToMany(mappedBy = "vehicleId", fetch = FetchType.LAZY)
    private List<VehicleReport> reportCategories;

    @OneToMany(mappedBy = "vehicleId", fetch = FetchType.LAZY)
    private List<VehicleReview> reviews;

    @Column(name = "report_title")
    private String reportTitle;

    @Override
    public Image getImage() {
        return mainImage;
    }
}