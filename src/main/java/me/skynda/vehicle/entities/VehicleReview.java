package me.skynda.vehicle.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Data;
import me.skynda.image.entities.Image;

import java.io.Serializable;

@Entity
@Data
@Table(name = "vehicle_review")
public class VehicleReview implements Serializable {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "logo_id", nullable = false)
	@NotNull
	private Image logo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "video_id", nullable = false)
	@NotNull
	private Image video;

	@Column(name = "text")
	private String text;

	@Column(name = "rating")
	private Integer rating;

	@Column(name = "vehicle_id", nullable = false)
	private Integer vehicleId;

}
