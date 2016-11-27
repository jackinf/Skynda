package me.skynda.vehicle.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Created by jevgenir on 11/20/2016.
 */
@Entity
@Data
@Table(name = "vehicle_report_item")
public class VehicleReportItem implements Serializable {

    @Id
    @Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column(name="title")
    private String title;

    @NotNull
    @Column(name="description")
    private String description;

    @Column(name = "vehicle_id", nullable = false)
    private Integer vehicleId;
}
