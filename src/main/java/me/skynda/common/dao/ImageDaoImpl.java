package me.skynda.common.dao;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.entity.Image;
import org.springframework.stereotype.Repository;

@Repository
public class ImageDaoImpl extends SkyndaBaseEntityDaoImpl<Image> implements ImageDao {
}
