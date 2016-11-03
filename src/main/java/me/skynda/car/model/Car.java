package me.skynda.car.model;

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
import javax.validation.constraints.Size;

@Entity
@Data
@Table(name = "cars_for_sale")
public class Car {

    @Id
    @Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;            // TODO: Add id to base model class

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "model_code", nullable = false)
    @NotNull
    private CarModels carModels;

    @OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<CarReport> carReport;

    @OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<CarReview> carReview;

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

    @OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<CarImage> images;

    private Boolean isSold;
    private String fuelCity;
    private String fuelHighway;

    @OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<CarFeature> features;

    @OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<CarFault> faults;
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