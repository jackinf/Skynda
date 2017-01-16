package me.skynda.image.dao;

import me.skynda.common.db.BaseEntityDaoImpl;
import me.skynda.common.interfaces.daos.IImageDao;
import me.skynda.image.entities.Image;
import org.springframework.stereotype.Repository;

@Repository
public class ImageDao extends BaseEntityDaoImpl<Image> implements IImageDao {
}
