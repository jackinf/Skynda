package me.skynda.car.controller;

import java.lang.reflect.Array;
import java.util.List;

import com.google.gson.Gson;
import me.skynda.car.dto.request.CarSearchRequestDto;
import me.skynda.common.dto.CreateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.SearchResponseDto;
import me.skynda.common.dto.UpdateResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import me.skynda.car.dto.CarDto;
import me.skynda.car.dto.SingleCarDataDto;
import me.skynda.car.service.CarService;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api", produces = "application/json")
public class CarController extends BaseController {

    @Autowired
    private CarService carService;

    @RequestMapping(value = "/cars", method = RequestMethod.GET)
    public List<SingleCarDataDto> getAll(@RequestBody(required = false) CarSearchRequestDto dto) {
        return carService.getCars();
    }

    @RequestMapping(value = "/car/{id}", method = RequestMethod.GET)
    public CarDto get(@PathVariable("id") Long id) {
        return carService.getCar(id);
    }

    @RequestMapping(value = "/car/{id}/detailed", method = RequestMethod.GET, produces = "application/json")
    public SingleCarDataDto getDetailed(@PathVariable("id") Long id) {
        return carService.getCarDetailed(id);
    }

    @RequestMapping(value = "/car", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> add(MultipartHttpServletRequest request,
               @RequestPart("faultsFiles") MultipartFile[] faultsFiles,
               @RequestPart("imageFiles") MultipartFile[] imageFiles,
               @RequestPart("car") CarDto carDto,
               BindingResult bindingResult) {
        // TODO: Problems is that it does not return a JSON response. Make it so that it would return a JSON response!!
        CreateResponseDto createResponseDto = carService.saveCarForSale(carDto, bindingResult);
        return new ResponseEntity<>(new Gson().toJson(createResponseDto), HttpStatus.OK);
    }

//	@RequestMapping(value = "/car", method = RequestMethod.POST, consumes = "application/json")
//    public CreateResponseDto add(@RequestBody CarDto carDto, BindingResult bindingResult) {
//        return carService.saveCarForSale(carDto, bindingResult);
//    }

    @RequestMapping(value = "/car/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public UpdateResponseDto update(@PathVariable("id") Long id,
                                    @RequestBody CarDto carDto,
                                    BindingResult bindingResult) {
        carDto.setId(id);
        return carService.updateCarForSale(carDto, bindingResult);
    }

    @RequestMapping(value = "/car/{id}", method = RequestMethod.DELETE, consumes = "application/json")
    public DeleteResponseDto delete(@PathVariable("id") Long id) {
        return carService.deleteCar(id);
    }

    @RequestMapping(value = "/car/search", method = RequestMethod.POST, consumes = "application/json")
    public SearchResponseDto search(@RequestBody CarSearchRequestDto searchParams){
        return carService.search(searchParams);
    }
}
