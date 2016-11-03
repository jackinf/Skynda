package me.skynda.common.dto;

import lombok.Data;
import me.skynda.car.dto.CarGeneralDto;

import java.util.List;

@Data
public class SearchResponseDto {
    private boolean success;
    private List<CarGeneralDto> cars;
}
