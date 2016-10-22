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

	// TODO: Add id to base model class
	@Id
	@Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "model_code", nullable = false)
    private CarModels carModels;

	@OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<CarReport> carReport;

	/**
	 * Reviewer's comments and ratings of this specific car.
	 */
	@OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<CarReview> carReview;
	
	private String vinCode;

	private BigDecimal price;

	/**
	 * TODO: Add to base model
	 */
	private Date created;

	/**
	 * TODO: private Date updated, and add it to base model
	 */

	//TODO FK customerId

	/**
	 * Car's registration number for... TODO
	 */
	private String registrationNumber;
	private String mileage;
	private String colorOutside;
	private String colorInside;

	/**
	 * Url's of the car.
	 */
	private String images;
	private Boolean isSold;
	private String fuelCity;
	private String fuelHighway;
	private String features;

	/**
	 * TODO: array of string.
	 * List of problems with the car.
	 */
	private String problems;
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
	private Integer safetyStars;
}