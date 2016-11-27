package me.skynda.image.entities;

import lombok.Data;
import me.skynda.vehicle.dto.ImageDto;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by ardi-pc on 2016-11-11.
 */

@Entity
@Data
@Table(name = "image")
public class Image implements Serializable {

    @Id
    @Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "url")
    private String url;

    @Column(name = "blob_name")
    private String blobName;

    @Column(name = "container_name")
    private String containerName;

    public static class Factory {
        public static Image create(String url, String blobName, String containerName) {
            Image image = new Image();
            image.setUrl(url);
            image.setBlobName(blobName);
            image.setContainerName(containerName);
            return image;
        }

        public static Image create(String url) {
            Image image = new Image();
            image.setUrl(url);
            return image;
        }

        public static Image clone(Image image) {
            if (image == null)
                return null;
            Image newImage = new Image();
            newImage.setUrl(image.getUrl());
            newImage.setBlobName(image.getBlobName());
            newImage.setContainerName(image.getContainerName());
            return newImage;
        }
    }
}
