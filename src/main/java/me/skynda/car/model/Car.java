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

import javax.persistence.Table;

@Entity
@Data
@Table(name = "cars_for_sale")
public class Car {

	@Id
	@Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;			// TODO: Add id to base model class
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "model_code", nullable = false)
    private CarModels carModels;

	@OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<CarReport> carReport;

	@OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<CarReview> carReview;
	
	private String vinCode;
	private BigDecimal price;

	private Date created;	// TODO: Add to base model (rename to createdOn)
//	private Date updatedOn;	// TODO: Add to base model

	//TODO FK customerId

	private String registrationNumber;
	private String mileage;			// TODO: Integer
	private String colorOutside;
	private String colorInside;

	/**
	 * Url's of the car.
	 */
	private String images;			// TODO: we need table car_image. Change type to List<CarImage>
	private Boolean isSold;
	private String fuelCity;
	private String fuelHighway;
	private String features;		// TODO: we need table car_features. Change type to List<CarFeature>
	private String problems;		// TODO: we need table car_faults (not problems). Change type to List<CarFault>
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