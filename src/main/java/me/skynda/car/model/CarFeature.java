package me.skynda.car.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "car_feature")
public class CarFeature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cars_for_sale_id", nullable = false)
    private Car car;
}
