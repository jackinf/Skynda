package me.skynda.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class ReportDto {

//	private List<CategoriesDto> categories;
//	private List<FaultsDto> faults;
	private String reportId; //PK
	private Integer carsForSaleId;//FK
	private String title;
	private Boolean isPass;
	private String pointsText;
	private String faultsText;
	private String faultsImg;
}
