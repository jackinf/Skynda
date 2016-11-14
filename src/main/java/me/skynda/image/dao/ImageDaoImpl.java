package me.skynda.image.dao;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.image.entities.Image;
import org.springframework.stereotype.Repository;

@Repository
public class ImageDaoImpl extends SkyndaBaseEntityDaoImpl<Image> implements ImageDao {
}
