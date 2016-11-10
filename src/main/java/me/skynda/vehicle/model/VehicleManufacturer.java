package me.skynda.vehicle.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "vehicle_manufacturer")
public class VehicleManufacturer {
	
	@Id
	private int id;
	private String manufacturerCode;
	private String description;
	private String title;

}
