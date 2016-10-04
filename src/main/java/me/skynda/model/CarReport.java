package me.skynda.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "car_report")
public class CarReport {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private String reportId; //PK
	private String title;
	private Boolean isPass;
	private String pointsText;
	private String faultsText;
	private String faultsImg;
	
}