package me.skynda.car.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "car_models")
public class CarModels {

	@Id
	private String modelCode;// PK

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "manufacturer_code", nullable = false)
	private CarManufacturer carManufacturer;

	private String description;
	private String title;
	private String transmission;
	private String engine;
	private Integer horsePower;
	private String drive;
	private Integer doors;
	private String seats;
	private Integer year;
	private String bodyType;
}
