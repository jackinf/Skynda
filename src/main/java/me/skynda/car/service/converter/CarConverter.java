package me.skynda.car.service.converter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import me.skynda.car.dto.*;
import me.skynda.car.model.*;
import me.skynda.common.helper.SkyndaUtility;
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
        singleCarDataDto.setPrice(car.getPrice());
		
		return singleCarDataDto;
	}

	private void convertGeneralData(Car car, SingleCarDataDto singleCarDataDto) {
		CarGeneralDto carGeneralDto = new CarGeneralDto();
        carGeneralDto.setSrc(car.getMainImageUrl());
		carGeneralDto.setColorInside(car.getColorInside());
		carGeneralDto.setColorOutside(car.getColorOutside());
		setCarModel(car.getCarModel(), carGeneralDto);
		singleCarDataDto.setCarGeneralDto(carGeneralDto);
	}

	private void convertOverviewData(Car car, SingleCarDataDto singleCarDataDto) {
		List<OverviewDto> overviewDtoList = new ArrayList<OverviewDto>();
        OverviewDto overviewDto = new OverviewDto();
		overviewDto.setIconUrl("hardcodedMileageIconLink");
		overviewDto.setLabel(car.getMileage() != null ? car.getMileage().toString() : "");
		overviewDtoList.add(overviewDto);

		CarModel carModel = car.getCarModel();
        if (carModel != null) {
            overviewDto.setIconUrl("hardcodedTransmissionIconLink");
            overviewDto = new OverviewDto();
            overviewDto.setLabel(carModel.getTransmission());
            overviewDtoList.add(overviewDto);

            overviewDto = new OverviewDto();
            overviewDto.setIconUrl("hardcodedEngineIconLink");
            overviewDto.setLabel(carModel.getEngine() + " (" + carModel.getHorsePower() + ")");
            overviewDtoList.add(overviewDto);

            overviewDto = new OverviewDto();
            overviewDto.setIconUrl("hardcodedDriveIconLink");
            overviewDto.setLabel(carModel.getDrive());
            overviewDtoList.add(overviewDto);

            overviewDto = new OverviewDto();
            overviewDto.setIconUrl("hardcodedDoorsSeatsIconLink");
            overviewDto.setLabel(carModel.getDoors() + " doors " + carModel.getSeats() + " seats");
            overviewDtoList.add(overviewDto);
        }

        overviewDto = new OverviewDto();
		overviewDto.setIconUrl("hardcodedColorOutsideIconLink");
		overviewDto.setLabel(car.getColorOutside());
		overviewDtoList.add(overviewDto);

        overviewDto = new OverviewDto();
		overviewDto.setIconUrl("hardcodedColorInsideIconLink");
		overviewDto.setLabel(car.getColorInside());
		overviewDtoList.add(overviewDto);

		singleCarDataDto.setOverview(overviewDtoList);
	}

	private void convertImagesData(Car car, SingleCarDataDto singleCarDataDto) {
        List<CarImage> images = car.getImages();
        if (images == null) {
            return;
        }

        List<String> listOfImages = images.stream().map(CarImage::getImageUrl).collect(Collectors.toList());
        List<ImagesDto> imagesDtoList = new ArrayList<ImagesDto>();
        for (String image : listOfImages) {
            ImagesDto imagesDto = new ImagesDto();
            imagesDto.setImageContainer(ImageContainerDto.Factory.createForDisplay(image));
            imagesDtoList.add(imagesDto);
        }
        singleCarDataDto.setImages(imagesDtoList);
    }

	private void convertDescriptionData(Car car, SingleCarDataDto singleCarDataDto) {
        // TODO: (list) car.getDescriptions(), not car.getCarModels().getDescription()
        CarModel carModel = car.getCarModel();
		if (carModel != null && carModel.getDescription() != null) {
			List<DescriptionsDto> descriptionsDtoList = new ArrayList<DescriptionsDto>();
			DescriptionsDto descriptionDto = new DescriptionsDto();
			descriptionDto.setText(carModel.getDescription());
			descriptionDto.setTitle(carModel.getTitle());
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

        CarModel carModel = car.getCarModel();
        if (carModel != null) {
            performanceDto.setDrivenWheels(carModel.getDrive());
            performanceDto.setDoors(carModel.getDoors());
            performanceDto.setHorsePower(carModel.getHorsePower());
        }

		performanceDto.setCompressionRatio(car.getCompressionRatio());
		performanceDto.setCompressionType(car.getCompressionType());
		performanceDto.setConfiguration(car.getConfiguration());
		performanceDto.setCylinders(car.getCylinders());
		performanceDto.setDisplacement(car.getDisplacement());
		performanceDto.setFuelType(car.getFuelType());
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
        List<CarReview> carReview1 = car.getCarReview();
        if (carReview1 != null) {
            for (CarReview carReview : carReview1) {
                ReviewDto reviewDto = new ReviewDto();
                reviewDto.setLogoUrl(carReview.getLogoUrl());
                reviewDto.setRating(carReview.getRating());
                reviewDto.setText(carReview.getText());
                reviewDto.setVideoUrl(carReview.getVideoUrl());
                reviewDtoList.add(reviewDto);
            }
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

        ImageContainerDto mainImageContainer = carDto.getMainImageContainer();
        if (mainImageContainer != null) {
            car.setMainImageUrl(mainImageContainer.getImageUrl());
            car.setMainImageBlobName(mainImageContainer.getBlobName());
            car.setMainImageContainerName(mainImageContainer.getContainerName());
        }

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

        ImageContainerDto mainImageContainerDto = ImageContainerDto.Factory.create(
            carDb.getMainImageUrl(),
            carDb.getMainImageBlobName(),
            carDb.getMainImageContainerName()
        );
        carDto.setMainImageContainer(mainImageContainerDto);

        CarModel carModel = carDb.getCarModel();
        if (carModel != null) {
            carDto.setCarModelsCode(carModel.getModelCode());
        }
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

        // Features
        List<CarFeature> features = carDb.getFeatures();
        if (features != null) {
            List<FeatureDto> featureDtos = carDb.getFeatures().stream().map(feature -> {
                FeatureDto dto = new FeatureDto();
                dto.setId(feature.getId());
                dto.setText(feature.getText());
                return dto;
            }).collect(Collectors.toList());
            carDto.setFeatures(featureDtos);
        }

        // Images
        List<CarImage> images = carDb.getImages();
        if (images != null) {
            List<ImagesDto> imageDtos = images.stream().map(image -> {
                ImagesDto imageDto = new ImagesDto();
                imageDto.setId(image.getId());

                ImageContainerDto imageContainerDto = ImageContainerDto.Factory.create(
                        image.getImageUrl(),
                        image.getImageBlobName(),
                        image.getImageContainerName()
                );
                imageDto.setImageContainer(imageContainerDto);

                return imageDto;
            }).collect(Collectors.toList());
            carDto.setImages(imageDtos);
        }

        // Faults
        List<CarFault> faults = carDb.getFaults();
        if (faults != null) {
            List<FaultsDto> faultsDtos = faults.stream().map(fault -> {
                FaultsDto faultDto = new FaultsDto();
                faultDto.setId(fault.getId());
                faultDto.setText(fault.getText());

                ImageContainerDto imageContainerDto = ImageContainerDto.Factory.create(
                        fault.getImageUrl(),
                        fault.getImageBlobName(),
                        fault.getImageContainerName()
                );
                faultDto.setImageContainer(imageContainerDto);

                return faultDto;
            }).collect(Collectors.toList());
            carDto.setFaults(faultsDtos);
        }

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

	public CarGeneralDto convertToSearchableCar(Car car) {
		CarGeneralDto carGeneralDto = new CarGeneralDto();
		List<CarImage> images = car.getImages();
		if (images != null) {
			CarImage primaryImage = images.stream()
					.filter(CarImage::isPrimary)
					.findFirst()
					.orElse(new CarImage());
			carGeneralDto.setSrc(primaryImage.getImageUrl());
		}

		carGeneralDto.setColorInside(car.getColorInside());
		carGeneralDto.setColorOutside(car.getColorOutside());
		carGeneralDto.setMileage(car.getMileage());

		setCarModel(car.getCarModel(), carGeneralDto);

		return carGeneralDto;
	}

	/**
	 * Helper, convert carModel to dto to set into carGeneralDto.
	 * @param carModel - source
	 * @param carGeneralDto - destination
	 */
	private void setCarModel(CarModel carModel, CarGeneralDto carGeneralDto) {
		if (carModel == null) {
			return;
		}

		carGeneralDto.setDoors(carModel.getDoors());
		carGeneralDto.setDrive(carModel.getDrive());
		carGeneralDto.setEngine(carModel.getEngine());
		carGeneralDto.setHorsePower(carModel.getHorsePower());
		carGeneralDto.setModel(carModel.getModelCode());
		carGeneralDto.setSeats(carModel.getSeats());
		carGeneralDto.setTransmission(carModel.getTransmission());
		carGeneralDto.setYear(carModel.getYear());

		CarManufacturer carManufacturer = carModel.getCarManufacturer();
		if (carManufacturer != null) {
            carGeneralDto.setManufacturer(carManufacturer.getManufacturerCode());
        }
	}
}
