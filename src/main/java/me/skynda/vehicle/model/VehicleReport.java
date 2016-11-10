package me.skynda.vehicle.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "vehicle_report")
public class VehicleReport {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id; //PK
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vehicle_id", nullable = false)
	private Vehicle vehicle;//FK
	private String title;
	private Boolean isPass;
	private String pointsText;
	private String faultsText;
	private String faulsImg;
	
}