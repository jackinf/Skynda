package me.skynda.vehicle.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * Created by jevgenir on 11/19/2016.
 */
@Entity
@Data
@Table(name = "vehicle_report_category_item")
public class VehicleReportCategoryItem  implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "is_pass")
    private Boolean isPass;

    @Column(name = "text")
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_report_category_id", nullable = false)
    @NotNull
    private Integer vehicleReportCategoryId;

}
