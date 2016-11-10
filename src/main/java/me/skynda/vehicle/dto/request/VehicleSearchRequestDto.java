package me.skynda.vehicle.dto.request;

import lombok.Data;
import me.skynda.common.dto.ClassificationDto.ButtonAttributesDto;
import me.skynda.common.dto.ClassificationDto.SliderAttributesDto;

import java.util.List;

@Data
public class VehicleSearchRequestDto {
    public List<ButtonAttributesDto> Brands;
    public List<ButtonAttributesDto> Colors;
    public List<ButtonAttributesDto> Features;
    public List<ButtonAttributesDto> Doors;
    public List<ButtonAttributesDto> Seats;
    public List<ButtonAttributesDto> Transmission;
    public SliderAttributesDto Mileage;
    public SliderAttributesDto Price;
    public SliderAttributesDto Year;
    public SliderAttributesDto PetrolConsumption;
    public SliderAttributesDto Power;
}
