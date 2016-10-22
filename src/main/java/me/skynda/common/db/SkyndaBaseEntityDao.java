package me.skynda.common.db;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.hibernate.LockOptions;

public interface SkyndaBaseEntityDao<T> {

    T get(Serializable id);

    T get(Serializable id, LockOptions lockOptions);

    T load(Serializable id);

    List<T> getAll();

    T save(T bean);

    T update(T bean);

    T merge(T bean);

    T saveOrUpdate(T bean);

    void save(Collection<T> beans);

    void saveOrUpdate(Collection<T> beans);

    void delete(Serializable id);

    void deleteEntity(T bean);

    void evict(T bean);

    void flush();

    String getNextUuid();

}
