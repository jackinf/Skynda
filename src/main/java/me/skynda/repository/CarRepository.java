package me.skynda.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import me.skynda.model.Car;

@RepositoryRestResource(path = "car")
public interface CarRepository extends PagingAndSortingRepository<Car, Long> {

	List<Car> findAll();

}