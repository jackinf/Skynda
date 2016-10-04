package me.skynda.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "car_review")
public class CarReview {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private String reviewId; //PK
	private String carsForSaleId;//FK
	private String logoUrl;
	private String videoUrl;
	private String text;
	private String rating;

}
