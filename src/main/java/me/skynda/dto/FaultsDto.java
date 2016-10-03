package me.skynda.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class FaultsDto {
	
	private String text;
	private String img;

}
