package me.skynda.image.entities;

import lombok.Data;

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
    }
}
