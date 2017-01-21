package me.skynda.common.db;

import lombok.SneakyThrows;
import org.hibernate.Hibernate;
import org.hibernate.LockOptions;
import org.hibernate.proxy.HibernateProxy;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.Collection;
import java.util.List;

/**
 * Entity specific DAO.
 */
public abstract class BaseEntityDaoImpl<T> extends BaseDAO implements SkyndaBaseEntityDao<T> {

	@SuppressWarnings("unchecked")
	@SneakyThrows(ClassNotFoundException.class)
	protected Class<T> getEntityClass() {
		ParameterizedType superClass = (ParameterizedType) getClass().getGenericSuperclass();
		String typeName = superClass.getActualTypeArguments()[0].getTypeName();
		return (Class<T>) Class.forName(typeName);
	}

	@Override
	@SuppressWarnings("unchecked")
	public T get(Serializable id) {
		return (T) getSession().get(getEntityClass(), id);
	}

	@Override
	@SuppressWarnings("unchecked")
	public T get(Serializable id, LockOptions lockOptions) {
		return (T) getSession().get(getEntityClass(), id, lockOptions);
	}

	@Override
	@SuppressWarnings("unchecked")
	public T load(Serializable id) {
		return (T) getSession().load(getEntityClass(), id);
	}

	@Override
	@SuppressWarnings("unchecked")
	//@HibernateQuerySyntaxTest
	public List<T> getAll() {
		return getSession().createCriteria(getEntityClass()).list();
	}

	@Override
	public T save(T bean) {
		getSession().save(bean);
		return bean;
	}

	@Override
	public T update(T bean) {
		getSession().update(bean);
		return bean;
	}

	@Override
	public T merge(T bean) {
		getSession().merge(bean);
		return bean;
	}

	@Override
	public T saveOrUpdate(T bean) {
		getSession().saveOrUpdate(bean);
		return bean;
	}

	@Override
	public void save(Collection<T> beans) {
		for (T t : beans) {
			save(t);
		}
	}

	@Override
	public void saveOrUpdate(Collection<T> beans) {
		for (T t : beans) {
			saveOrUpdate(t);
		}
	}

	@Override
	public void delete(Serializable id) {
		getSession().delete(get(id));
	}

	@Override
	public void deleteEntity(T bean) {
		getSession().delete(bean);
	}

	@Override
	public void evict(T bean) {
		getSession().evict(bean);
	}

	@SuppressWarnings("unchecked")
	public static <Y> Y initializeAndUnproxy(Y entity) {
		if (entity == null) {
			throw new NullPointerException("Entity passed for initialization is null");
		}

		Hibernate.initialize(entity);
		if (entity instanceof HibernateProxy) {
			entity = (Y) ((HibernateProxy) entity).getHibernateLazyInitializer().getImplementation();
		}
		return entity;
	}

	@Override
	public void flush() {
		getSession().flush();
	}

}
