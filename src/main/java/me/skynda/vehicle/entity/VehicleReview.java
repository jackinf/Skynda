package me.skynda.vehicle.entity;

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
@Table(name = "vehicle_review")
public class VehicleReview {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id; //PK
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vehicle_id", nullable = false)
	private Vehicle vehicle;//FK
	private String logoUrl;
	private String videoUrl;
	private String text;
	private Integer rating;

}
