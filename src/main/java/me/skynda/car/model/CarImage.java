package me.skynda.car.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "car_image")
public class CarImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;
    private boolean isPrimary;
    private String imageBlobName;
    private String imageContainerName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "car_for_sale_id", nullable = false)
    private Car car;
}
