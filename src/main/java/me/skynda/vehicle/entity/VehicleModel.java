package me.skynda.vehicle.entity;

import javax.persistence.*;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Table(name = "vehicle_model")
public class VehicleModel implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "serial")
	private Long id;

	@Column(name = "model_code")
	private String modelCode;

	@Column(name = "description")
	private String description;

	@Column(name = "title")
	private String title;

	@Column(name = "engine")
	private String engine;

	@Column(name = "horse_power")
	private Integer horsePower;

	@Column(name = "doors")
	private Integer doors;

	@Column(name = "seats")
	private Integer seats;

	@Column(name = "year")
	private Integer year;

	@Column(name = "archived")
	private Date archived;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "vehicle_manufacturer_id", nullable = false)
	private Classification vehicleManufacturer;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "transmission_id", nullable = false)
	private Classification transmission;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "drivetrain_id", nullable = false)
	private Classification drivetrain;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "vehicle_body_id", nullable = false)
	private Classification vehicleBody;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "fuel_type_id", nullable = false)
	private Classification fuelType;
}
