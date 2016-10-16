package me.skynda.model;

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

@Entity
@Data
@Table(name = "cars_for_sale")
public class Car {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "model_code", nullable = false)
    private CarModels carModels;
	
	@OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<CarReport> carReport;
	
	@OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<CarReview> carReview;
	
	private String vinCode;
	private BigDecimal price;
	private Date created;
	//TODO FK customerId 
	private String registrationNumber;
	private String mileage;
	private String colorOutside;
	private String colorInside;
	private String images;
	private Boolean isSold;
	private String fuelCity;
	private String fuelHighway;
	private String features;
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