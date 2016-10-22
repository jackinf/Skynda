package me.skynda.model;

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
@Table(name = "car_review")
public class CarReview {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private String reviewId; //PK
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cars_for_sale_id", nullable = false)
	private Car car;//FK
	private String logoUrl;
	private String videoUrl;
	private String text;
	private Integer rating;

}
