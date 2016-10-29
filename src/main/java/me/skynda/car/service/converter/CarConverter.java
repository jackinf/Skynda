package me.skynda.car.service.converter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import me.skynda.car.dto.*;
import me.skynda.car.model.*;
import org.springframework.stereotype.Component;

@Component
public class CarConverter {
	
	public SingleCarDataDto transform(Car car) {
		SingleCarDataDto singleCarDataDto = new SingleCarDataDto();
		singleCarDataDto.setId(car.getId());
		convertGeneralData(car, singleCarDataDto);
		convertOverviewData(car, singleCarDataDto);
		convertImagesData(car, singleCarDataDto);
		convertDescriptionData(car, singleCarDataDto);
		convertFeaturesData(car, singleCarDataDto);
		convertHistoryData(car, singleCarDataDto);
		convertPetrolData(car, singleCarDataDto);
		convertPerformanceData(car, singleCarDataDto);
		singleCarDataDto.setSafetyStars(car.getSafetyStars());
		convertReportData(car, singleCarDataDto);
		convertReviewData(car, singleCarDataDto);
		
		return singleCarDataDto;
	}

	private void convertGeneralData(Car car, SingleCarDataDto singleCarDataDto) {
		CarGeneralDto carGeneralDto = new CarGeneralDto();
		carGeneralDto.setColorInside(car.getColorInside());
		carGeneralDto.setColorOutside(car.getColorOutside());
		carGeneralDto.setDoors(car.getCarModels().getDoors());
		carGeneralDto.setDrive(car.getCarModels().getDrive());
		carGeneralDto.setEngine(car.getCarModels().getEngine());
		carGeneralDto.setHorsePower(car.getCarModels().getHorsePower());
		carGeneralDto.setManufacturer(car.getCarModels().getCarManufacturer().getManufacturerCode());
		carGeneralDto.setMileage(car.getMileage());
		carGeneralDto.setModel(car.getCarModels().getModelCode());
		carGeneralDto.setSeats(car.getCarModels().getSeats());
//		carGeneralDto.setSrc(car.getImages());	// TODO: Why do we need this?
		carGeneralDto.setTransmission(car.getCarModels().getTransmission());
		carGeneralDto.setYear(car.getCarModels().getYear());
		singleCarDataDto.setCarGeneralDto(carGeneralDto);
	}

	private void convertOverviewData(Car car, SingleCarDataDto singleCarDataDto) {
		OverviewDto overviewDto = new OverviewDto();
		List<OverviewDto> overviewDtoList = new ArrayList<OverviewDto>();
		overviewDto.setIconUrl("hardcodedMileageIconLink");
		overviewDto.setLabel(car.getMileage() != null ? car.getMileage().toString() : "");
		overviewDtoList.add(overviewDto);
		overviewDto.setIconUrl("hardcodedTransmissionIconLink");
		overviewDto.setLabel(car.getCarModels().getTransmission());
		overviewDtoList.add(overviewDto);
		overviewDto.setIconUrl("hardcodedEngineIconLink");
		overviewDto.setLabel(car.getCarModels().getEngine() + " (" + car.getCarModels().getHorsePower() + ")");
		overviewDtoList.add(overviewDto);
		overviewDto.setIconUrl("hardcodedDriveIconLink");
		overviewDto.setLabel(car.getCarModels().getDrive());
		overviewDtoList.add(overviewDto);
		overviewDto.setIconUrl("hardcodedDoorsSeatsIconLink");
		overviewDto.setLabel(car.getCarModels().getDoors() + " doors " + car.getCarModels().getSeats() + " seats");
		overviewDtoList.add(overviewDto);
		overviewDto.setIconUrl("hardcodedColorOutsideIconLink");
		overviewDto.setLabel(car.getColorOutside());
		overviewDtoList.add(overviewDto);
		overviewDto.setIconUrl("hardcodedColorInsideIconLink");
		overviewDto.setLabel(car.getColorInside());
		overviewDtoList.add(overviewDto);
		singleCarDataDto.setOverview(overviewDtoList);
	}

	private void convertImagesData(Car car, SingleCarDataDto singleCarDataDto) {
		if (car.getImages() != null) {
			List<String> listOfImages = car.getImages().stream().map(CarImage::getImageUrl).collect(Collectors.toList());
			List<ImagesDto> imagesDtoList = new ArrayList<ImagesDto>();
			for (String image : listOfImages) {
				ImagesDto imagesDto = new ImagesDto();
				imagesDto.setOriginal(image);
				imagesDto.setThumbnail(image);
				imagesDtoList.add(imagesDto);
			}
			singleCarDataDto.setImages(imagesDtoList);
		}
	}

	private void convertDescriptionData(Car car, SingleCarDataDto singleCarDataDto) {
		if (car.getCarModels().getDescription() != null) {
			List<DescriptionsDto> descriptionsDtoList = new ArrayList<DescriptionsDto>();
			DescriptionsDto descriptionDto = new DescriptionsDto();
			descriptionDto.setText(car.getCarModels().getDescription());
			descriptionDto.setTitle(car.getCarModels().getTitle());
			descriptionsDtoList.add(descriptionDto);
			descriptionDto.setText(car.getCarModels().getCarManufacturer().getDescription());
			descriptionDto.setTitle(car.getCarModels().getCarManufacturer().getTitle());
			descriptionsDtoList.add(descriptionDto);
			singleCarDataDto.setDescriptions(descriptionsDtoList);
		}
	}

	private void convertFeaturesData(Car car, SingleCarDataDto singleCarDataDto) {
		if (car.getFeatures() != null) {
			List<String> listOfFeatures = car.getFeatures().stream().map(CarFeature::getText).collect(Collectors.toList());
			singleCarDataDto.setFeatures(listOfFeatures);
		}
	}

	private void convertHistoryData(Car car, SingleCarDataDto singleCarDataDto) {
		if (car.getFaults() != null) {
			HistoryDto historyDto = new HistoryDto();
			List<String> listOfProblems = car.getFaults().stream().map(CarFault::getText).collect(Collectors.toList());
			historyDto.setProblems(listOfProblems);
			historyDto.setVinCode(car.getVinCode());
			singleCarDataDto.setHistory(historyDto);
		}
	}

	private void convertPetrolData(Car car, SingleCarDataDto singleCarDataDto) {
		PetrolConsumptionDto petrolConsumptionDto = new PetrolConsumptionDto();
		petrolConsumptionDto.setCity(car.getFuelCity());
		petrolConsumptionDto.setHighWay(car.getFuelHighway());
		petrolConsumptionDto.setAverage(car.getFuelCity(), car.getFuelHighway());
		singleCarDataDto.setPetrolConsumption(petrolConsumptionDto);
	}

	private void convertPerformanceData(Car car, SingleCarDataDto singleCarDataDto) {
		PerformanceDto performanceDto = new PerformanceDto();
		performanceDto.setDrivenWheels(car.getCarModels().getDrive());
		performanceDto.setDoors(car.getCarModels().getDoors());
		performanceDto.setCompressionRatio(car.getCompressionRatio());
		performanceDto.setCompressionType(car.getCompressionType());
		performanceDto.setConfiguration(car.getConfiguration());
		performanceDto.setCylinders(car.getCylinders());
		performanceDto.setDisplacement(car.getDisplacement());
		performanceDto.setFuelType(car.getFuelType());
		performanceDto.setHorsePower(car.getCarModels().getHorsePower());
		performanceDto.setSize(car.getSize());
		performanceDto.setTorque(car.getTorque());
		performanceDto.setTotalValves(car.getTotalValves());
		performanceDto.setPowerTrain(car.getPowerTrain());
		singleCarDataDto.setPerformance(performanceDto);
	}

	private void convertReportData(Car car, SingleCarDataDto singleCarDataDto) {
			ReportDto reportDto = new ReportDto();
//			reportDto.setCarsForSaleId(carReport.getCar().getId());
//			reportDto.setFaultsImg(carReport.getFaulsImg());
//			reportDto.setFaultsText(carReport.getFaultsText());
//			reportDto.setIsPass(carReport.getIsPass());
//			reportDto.setPointsText(carReport.getPointsText());
//			reportDto.setReportId(carReport.getReportId());
//			reportDto.setTitle(carReport.getTitle());
//			reportDtoList.add(reportDto);
		singleCarDataDto.setReport(reportDto);
	}

	private void convertReviewData(Car car, SingleCarDataDto singleCarDataDto) {
		List<ReviewDto> reviewDtoList = new ArrayList<ReviewDto>();
		for (CarReview carReview : car.getCarReview()) {
			ReviewDto reviewDto = new ReviewDto();
			reviewDto.setLogoUrl(carReview.getLogoUrl());
			reviewDto.setRating(carReview.getRating());
			reviewDto.setText(carReview.getText());
			reviewDto.setVideoUrl(carReview.getVideoUrl());
			reviewDtoList.add(reviewDto);
		}
		singleCarDataDto.setReviews(reviewDtoList);
	}

	/*
	====================================
	==================================== CAR DTO -> CAR MODEL
	====================================
	 */

	public Car transform(CarDto carDto) {
		Car car = new Car();
		car.setId(carDto.getId());
		car.setVinCode(carDto.getVinCode());
		car.setPrice(carDto.getPrice());
		car.setRegistrationNumber(carDto.getRegistrationNumber());
		car.setMileage(carDto.getMileage());
		car.setColorInside(carDto.getColorInside());
		car.setColorOutside(carDto.getColorOutside());
		car.setIsSold(carDto.getIsSold());
		car.setFuelCity(carDto.getFuelCity());
		car.setFuelHighway(carDto.getFuelHighway());
		car.setSafetyStars(carDto.getSafetyStars());

		/*
			PERFORMANCE section
		 */
		PerformanceDto performanceDto = carDto.getPerformance();
		if (performanceDto != null) {
			car.setCompressionRatio(performanceDto.getCompressionRatio());
			car.setCompressionType(performanceDto.getCompressionType());
			car.setConfiguration(performanceDto.getConfiguration());
			car.setCylinders(performanceDto.getCylinders());
			car.setDisplacement(performanceDto.getDisplacement());
			car.setFuelType(performanceDto.getFuelType());
			car.setSize(performanceDto.getSize());
			car.setTorque(performanceDto.getTorque());
			car.setTotalValves(performanceDto.getTotalValves());
			car.setPowerTrain(performanceDto.getPowerTrain());
		}

		return car;
	}

	/*
	====================================
	====  CAR MODEL -> CAR DTO
	====================================
	 */

	public CarDto transformToCarDto(Car carDb) {
		CarDto carDto = new CarDto();
		carDto.setId(carDb.getId());
		carDto.setVinCode(carDb.getVinCode());
		carDto.setPrice(carDb.getPrice());
		carDto.setRegistrationNumber(carDb.getRegistrationNumber());
		carDto.setMileage(carDb.getMileage());
		carDto.setColorInside(carDb.getColorInside());
		carDto.setColorOutside(carDb.getColorOutside());
		carDto.setIsSold(carDb.getIsSold());
		carDto.setFuelCity(carDb.getFuelCity());
		carDto.setFuelHighway(carDb.getFuelHighway());
		carDto.setSafetyStars(carDb.getSafetyStars());

		/*
			PERFORMANCE section
		 */
		PerformanceDto performanceDto = new PerformanceDto();
		performanceDto.setCompressionRatio(carDb.getCompressionRatio());
		performanceDto.setCompressionType(carDb.getCompressionType());
		performanceDto.setConfiguration(carDb.getConfiguration());
		performanceDto.setCylinders(carDb.getCylinders());
		performanceDto.setDisplacement(carDb.getDisplacement());
		performanceDto.setFuelType(carDb.getFuelType());
		performanceDto.setSize(carDb.getSize());
		performanceDto.setTorque(carDb.getTorque());
		performanceDto.setTotalValves(carDb.getTotalValves());
		performanceDto.setPowerTrain(carDb.getPowerTrain());
        carDto.setPerformance(performanceDto);

		return carDto;
	}
}
