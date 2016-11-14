package me.skynda.vehicle.entities;

import javax.persistence.*;

import lombok.Data;

import java.io.Serializable;

@Entity
@Data
@Table(name = "vehicle_review")
public class VehicleReview implements Serializable {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "logo_url")
	private String logoUrl;

	@Column(name = "video_url")
	private String videoUrl;

	@Column(name = "text")
	private String text;

	@Column(name = "rating")
	private Integer rating;

	@Column(name = "vehicle_id", nullable = false)
	private Integer vehicleId;

}
