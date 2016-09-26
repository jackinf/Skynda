package me.skynda.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "cars_for_sale")
public class Car {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String vin;
	private String price;




}