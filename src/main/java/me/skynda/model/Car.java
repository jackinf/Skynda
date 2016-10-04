package me.skynda.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

import javax.persistence.Table;

@Entity
@Data
@Table(name = "cars_for_sale")
public class Car {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "model_code", nullable = false)
    private CarModels carModels;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "report_id", nullable = false)
    private CarReport carReport;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "review_id", nullable = false)
    private CarReview carReview;
	
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
	private String fuelHigway;
	private String features;
	private String problems;
	private String compressionRatio;
	private String compressionType;
	private String configuration;
	private String cylinders;
	private String displacement;
	private String fuelType;
	private String size;
	private String torque;
	private String totalValves;
	private String powerTrain;
	private String safetyStars;
}