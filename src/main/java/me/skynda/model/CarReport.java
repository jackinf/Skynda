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
@Table(name = "car_report")
public class CarReport {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private String reportId; //PK
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cars_for_sale_id", nullable = false)
	private Car car;//FK
	private String title;
	private Boolean isPass;
	private String pointsText;
	private String faultsText;
	private String faultsImg;
	
}