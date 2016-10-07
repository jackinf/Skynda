package me.skynda.model;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "car_manufacturer")
public class CarManufacturer {
	
	private String manufacturerCode;//PK
	private String description;
	private String title;

}
