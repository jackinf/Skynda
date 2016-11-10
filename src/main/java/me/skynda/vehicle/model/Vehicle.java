package me.skynda.vehicle.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Data
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;            // TODO: Add id to base model class

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "model_code", nullable = false)
    @NotNull
    private VehicleModel vehicleModel;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    private List<VehicleReport> carReport;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    private List<VehicleReview> vehicleReview;

    private String mainImageUrl;
    private String mainImageBlobName;
    private String mainImageContainerName;

    @NotEmpty
    private String vinCode;

    @NotNull
    private BigDecimal price;

    private Date created;    // TODO: Add to base model (rename to createdOn)
//	private Date updatedOn;	// TODO: Add to base model

    //TODO FK customerId

    @NotEmpty
    private String registrationNumber;

    @NotNull
    private BigDecimal mileage;

    @NotEmpty
    private String colorOutside;

    @NotEmpty
    private String colorInside;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    private List<VehicleImage> images;

    private Boolean isSold;
    private String fuelCity;
    private String fuelHighway;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    private List<VehicleFeature> features;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    private List<VehicleFault> faults;
    private Integer safetyStars;

    /*
        PERFORMANCE section.
     */
    private Integer compressionRatio;
    private String compressionType;
    private String configuration;
    private String cylinders;
    private String displacement;
    private String fuelType;
    private Integer size;
    private Integer torque;
    private Integer totalValves;
    private String powerTrain;
}