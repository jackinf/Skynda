package me.skynda.dto;

import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class HistoryDto {
	
	private List<String> problems;
	private String vinCode;

}
