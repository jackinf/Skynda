package me.skynda.vehicle.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;


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

    @Column(name = "vehicle_report_category_id", nullable = false)
    private Integer vehicleReportCategoryId;

}
