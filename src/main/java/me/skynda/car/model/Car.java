package me.skynda.car.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Table;

/**
 * Main car model
 */
@Entity
@Data
@Table(name = "cars_for_sale")
public class Car {

	// TODO: Add id to base model class
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "model_code", nullable = false)
    private CarModels carModels;

	/**
	 *
	 */
	@OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<CarReport> carReport;

	/**
	 * Reviewer's comments and ratings of this specific car.
	 */
	@OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<CarReview> carReview;
	
	private String vinCode;

	/**
	 * How much does the car costs.
	 */
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

	/**
	 * What is the last registered mileage the car has driven.
	 */
	private String mileage;

	/**
	 * Car's paint from the outside (on doors, roof etc).
	 */
	private String colorOutside;

	/**
	 * Car's interior's color.
	 */
	private String colorInside;

	/**
	 * Url's of the car.
	 */
	private String images;

	/**
	 * Is the car sold (not available for sale anymore).
	 */
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

	/**
	 * 95, 98, Diesel.
	 */
	private String fuelType;
	private Integer size;
	private Integer torque;
	private Integer totalValves;
	private String powerTrain;
	private Integer safetyStars;
}