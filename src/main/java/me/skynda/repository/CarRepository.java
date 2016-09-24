package me.skynda.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import me.skynda.model.Car;

@RepositoryRestResource(path = "car")
//@RequestMapping(value = "/car", produces = "application/json")
public interface CarRepository extends PagingAndSortingRepository<Car, Long> {

	List<Car> findAll();

}