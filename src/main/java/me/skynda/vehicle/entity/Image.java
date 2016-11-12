package me.skynda.vehicle.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by ardi-pc on 2016-11-11.
 */

@Entity
@Data
@Table(name = "vehicle")
public class Image {

    @Id
    @Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url")
    private String url;

    @Column(name = "blob_name")
    private String blobName;

    @Column(name = "container_name")
    private String containerName;

}
