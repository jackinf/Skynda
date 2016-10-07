package me.skynda.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "car_models")
public class CarModels {

	private String modelCode;// PK

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "manufacturer_code", nullable = false)
	private CarManufacturer carManufacturer;

	private String description;
	private String title;
	private String transmission;
	private String engine;
	private String horsePower;
	private String drive;
	private String doors;
	private String seats;
	private String year;
	private String bodyType;
}
