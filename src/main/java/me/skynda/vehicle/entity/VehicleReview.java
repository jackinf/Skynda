package me.skynda.vehicle.entity;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "vehicle_review")
public class VehicleReview {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vehicle_id", nullable = false)
	private Vehicle vehicle;

	@Column(name = "logo_url")
	private String logoUrl;

	@Column(name = "video_url")
	private String videoUrl;

	@Column(name = "text")
	private String text;

	@Column(name = "rating")
	private Integer rating;

}
