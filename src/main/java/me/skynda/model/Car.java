package me.skynda.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "cars_for_sale")
public class Car {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String modelCode;
	private String manufacturerCode;
	private String vinCode;
	private BigDecimal price;
	private Date created;
	//FK customerId
	private String registrationNumber;
	private String mileage;
	private String color;
	private String images;
	private Boolean isSold;
	private String fuelCity;
	private String fuelHigway;

}