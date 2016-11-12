package me.skynda.vehicle.service.converter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import me.skynda.vehicle.dto.*;
import me.skynda.vehicle.entity.*;
import org.springframework.stereotype.Component;

@Component
public class VehicleConverter {
	
	public VehicleDto transform(Vehicle vehicle) {
		VehicleDto vehicleDto = new VehicleDto();
		vehicleDto.setId(vehicle.getId());

		convertGeneralData(vehicle, vehicleDto);
		convertOverviewData(vehicle, vehicleDto);
		convertImagesData(vehicle, vehicleDto);
		convertDescriptionData(vehicle, vehicleDto);
		convertFeaturesData(vehicle, vehicleDto);
		convertHistoryData(vehicle, vehicleDto);
		convertPetrolData(vehicle, vehicleDto);
		convertPerformanceData(vehicle, vehicleDto);
		singleVehicleDataDto.setSafetyStars(vehicle.getSafetyStars());
		convertReportData(vehicle, singleVehicleDataDto);
		convertReviewData(vehicle, singleVehicleDataDto);
        singleVehicleDataDto.setPrice(vehicle.getPrice());
		
		return singleVehicleDataDto;
	}

	private void convertGeneralData(Vehicle vehicle, VehicleDto vehicleDto) {
		VehicleGeneralDto vGeneralDto = new VehicleGeneralDto();
		vGeneralDto.setSrc(vehicle.getMainImageUrl());
		vGeneralDto.setColorInside(vehicle.getColorInside());
		vGeneralDto.setColorOutside(vehicle.getColorOutside());
		setVehicleModel(vehicle.getModel(), vGeneralDto);
		singleVehicleDataDto.setVehicleGeneralDto(vGeneralDto);
	}

	private void convertOverviewData(Vehicle vehicle, SingleVehicleDataDto singleVehicleDataDto) {
		List<OverviewDto> overviewDtoList = new ArrayList<OverviewDto>();
        OverviewDto overviewDto = new OverviewDto();
		overviewDto.setIconUrl("hardcodedMileageIconLink");
		overviewDto.setLabel(vehicle.getMileage() != null ? vehicle.getMileage().toString() : "");
		overviewDtoList.add(overviewDto);

		VehicleModel vehicleModel = vehicle.getModel();
        if (vehicleModel != null) {
            overviewDto.setIconUrl("hardcodedTransmissionIconLink");
            overviewDto = new OverviewDto();
            overviewDto.setLabel(vehicleModel.getTransmission());
            overviewDtoList.add(overviewDto);

            overviewDto = new OverviewDto();
            overviewDto.setIconUrl("hardcodedEngineIconLink");
            overviewDto.setLabel(vehicleModel.getEngine() + " (" + vehicleModel.getHorsePower() + ")");
            overviewDtoList.add(overviewDto);

            overviewDto = new OverviewDto();
            overviewDto.setIconUrl("hardcodedDriveIconLink");
            overviewDto.setLabel(vehicleModel.getDrive());
            overviewDtoList.add(overviewDto);

            overviewDto = new OverviewDto();
            overviewDto.setIconUrl("hardcodedDoorsSeatsIconLink");
            overviewDto.setLabel(vehicleModel.getDoors() + " doors " + vehicleModel.getSeats() + " seats");
            overviewDtoList.add(overviewDto);
        }

        overviewDto = new OverviewDto();
		overviewDto.setIconUrl("hardcodedColorOutsideIconLink");
		overviewDto.setLabel(vehicle.getColorOutside());
		overviewDtoList.add(overviewDto);

        overviewDto = new OverviewDto();
		overviewDto.setIconUrl("hardcodedColorInsideIconLink");
		overviewDto.setLabel(vehicle.getColorInside());
		overviewDtoList.add(overviewDto);

		singleVehicleDataDto.setOverview(overviewDtoList);
	}

	private void convertImagesData(Vehicle vehicle, SingleVehicleDataDto singleVehicleDataDto) {
        List<VehicleImage> images = vehicle.getImages();
        if (images == null) {
            return;
        }

        List<String> listOfImages = images.stream().map(VehicleImage::getImageUrl).collect(Collectors.toList());
        List<ImagesDto> imagesDtoList = new ArrayList<ImagesDto>();
        for (String image : listOfImages) {
            ImagesDto imagesDto = new ImagesDto();
            imagesDto.setImageContainer(ImageContainerDto.Factory.createForDisplay(image));
            imagesDtoList.add(imagesDto);
        }
        singleVehicleDataDto.setImages(imagesDtoList);
    }

	private void convertDescriptionData(Vehicle vehicle, SingleVehicleDataDto singleVehicleDataDto) {
        // TODO: (list) vehicle.getDescription(), not vehicle.getModel().getDescription()
        VehicleModel vehicleModel = vehicle.getModel();
		if (vehicleModel != null && vehicleModel.getDescription() != null) {
			List<DescriptionsDto> descriptionsDtoList = new ArrayList<DescriptionsDto>();
			DescriptionsDto descriptionDto = new DescriptionsDto();
			descriptionDto.setText(vehicleModel.getDescription());
			descriptionDto.setTitle(vehicleModel.getTitle());
			descriptionsDtoList.add(descriptionDto);
			singleVehicleDataDto.setDescriptions(descriptionsDtoList);
		}
	}

	private void convertFeaturesData(Vehicle vehicle, SingleVehicleDataDto singleVehicleDataDto) {
		if (vehicle.getFeatures() != null) {
			List<String> listOfFeatures = vehicle.getFeatures().stream().map(VehicleFeature::getText).collect(Collectors.toList());
			singleVehicleDataDto.setFeatures(listOfFeatures);
		}
	}

	private void convertHistoryData(Vehicle vehicle, SingleVehicleDataDto singleVehicleDataDto) {
		if (vehicle.getFaults() != null) {
			HistoryDto historyDto = new HistoryDto();
			List<String> listOfProblems = vehicle.getFaults().stream().map(VehicleFault::getText).collect(Collectors.toList());
			historyDto.setProblems(listOfProblems);
			historyDto.setVinCode(vehicle.getVinCode());
			singleVehicleDataDto.setHistory(historyDto);
		}
	}

	private void convertPetrolData(Vehicle vehicle, SingleVehicleDataDto singleVehicleDataDto) {
		PetrolConsumptionDto petrolConsumptionDto = new PetrolConsumptionDto();
		petrolConsumptionDto.setCity(vehicle.getFuelCity());
		petrolConsumptionDto.setHighWay(vehicle.getFuelHighway());
		petrolConsumptionDto.setAverage(vehicle.getFuelCity(), vehicle.getFuelHighway());
		singleVehicleDataDto.setPetrolConsumption(petrolConsumptionDto);
	}

	private void convertPerformanceData(Vehicle vehicle, SingleVehicleDataDto singleVehicleDataDto) {
		PerformanceDto performanceDto = new PerformanceDto();

    	VehicleModel vehicleModel = vehicle.getModel();
        if (vehicleModel != null) {
            performanceDto.setDrivenWheels(vehicleModel.getDrive());
            performanceDto.setDoors(vehicleModel.getDoors());
            performanceDto.setHorsePower(vehicleModel.getHorsePower());
        }

		performanceDto.setCompressionRatio(vehicle.getCompressionRatio());
		performanceDto.setCompressionType(vehicle.getCompressionType());
		performanceDto.setConfiguration(vehicle.getConfiguration());
		performanceDto.setCylinders(vehicle.getCylinders());
		performanceDto.setDisplacement(vehicle.getDisplacement());
		performanceDto.setFuelType(vehicle.getFuelType());
		performanceDto.setSize(vehicle.getSize());
		performanceDto.setTorque(vehicle.getTorque());
		performanceDto.setTotalValves(vehicle.getTotalValves());
		performanceDto.setPowerTrain(vehicle.getPowerTrain());
		singleVehicleDataDto.setPerformance(performanceDto);
	}

	private void convertReportData(Vehicle vehicle, SingleVehicleDataDto singleVehicleDataDto) {
			ReportDto reportDto = new ReportDto();
//			reportDto.setCarsForSaleId(reports.getVehicle().getId());
//			reportDto.setFaultsImg(reports.getFaulsImg());
//			reportDto.setFaultsText(reports.getFaultsText());
//			reportDto.setIsPass(reports.getIsPass());
//			reportDto.setPointsText(reports.getPointsText());
//			reportDto.setReportId(reports.getReportId());
//			reportDto.setTitle(reports.getTitle());
//			reportDtoList.add(reportDto);
		singleVehicleDataDto.setReport(reportDto);
	}

	private void convertReviewData(Vehicle vehicle, SingleVehicleDataDto singleVehicleDataDto) {
		List<ReviewDto> reviewDtoList = new ArrayList<ReviewDto>();
        List<VehicleReview> vehicleReview1 = vehicle.getReviews();
        if (vehicleReview1 != null) {
            for (VehicleReview vehicleReview : vehicleReview1) {
                ReviewDto reviewDto = new ReviewDto();
                reviewDto.setLogoUrl(vehicleReview.getLogoUrl());
                reviewDto.setRating(vehicleReview.getRating());
                reviewDto.setText(vehicleReview.getText());
                reviewDto.setVideoUrl(vehicleReview.getVideoUrl());
                reviewDtoList.add(reviewDto);
            }
        }
		singleVehicleDataDto.setReviews(reviewDtoList);
	}

	/*
	====================================
	==================================== VEHICLE DTO -> VEHICLE MODEL
	====================================
	 */

	public Vehicle transform(VehicleDto vehicleDto) {
		Vehicle vehicle = new Vehicle();
		vehicle.setId(vehicleDto.getId());

        ImageContainerDto mainImageContainer = vehicleDto.getMainImageContainer();
        if (mainImageContainer != null) {
			vehicle.setMainImageUrl(mainImageContainer.getImageUrl());
			vehicle.setMainImageBlobName(mainImageContainer.getBlobName());
			vehicle.setMainImageContainerName(mainImageContainer.getContainerName());
        }

		vehicle.setVinCode(vehicleDto.getVinCode());
		vehicle.setPrice(vehicleDto.getPrice());
		vehicle.setRegistrationNumber(vehicleDto.getRegistrationNumber());
		vehicle.setMileage(vehicleDto.getMileage());
		vehicle.setColorInside(vehicleDto.getColorInside());
		vehicle.setColorOutside(vehicleDto.getColorOutside());
		vehicle.setIsSold(vehicleDto.getIsSold());
		vehicle.setFuelCity(vehicleDto.getFuelCity());
		vehicle.setFuelHighway(vehicleDto.getFuelHighway());
		vehicle.setSafetyStars(vehicleDto.getSafetyStars());

		/*
			PERFORMANCE section
		 */
		PerformanceDto performanceDto = vehicleDto.getPerformance();
		if (performanceDto != null) {
			vehicle.setCompressionRatio(performanceDto.getCompressionRatio());
			vehicle.setCompressionType(performanceDto.getCompressionType());
			vehicle.setConfiguration(performanceDto.getConfiguration());
			vehicle.setCylinders(performanceDto.getCylinders());
			vehicle.setDisplacement(performanceDto.getDisplacement());
			vehicle.setFuelType(performanceDto.getFuelType());
			vehicle.setSize(performanceDto.getSize());
			vehicle.setTorque(performanceDto.getTorque());
			vehicle.setTotalValves(performanceDto.getTotalValves());
			vehicle.setPowerTrain(performanceDto.getPowerTrain());
		}

		return vehicle;
	}

	/*
	====================================
	====  CAR MODEL -> CAR DTO
	====================================
	 */

	public VehicleDto transformToVehicleDto(Vehicle vehicleDb) {
		VehicleDto vehicleDto = new VehicleDto();
		vehicleDto.setId(vehicleDb.getId());

        ImageContainerDto mainImageContainerDto = ImageContainerDto.Factory.create(
				vehicleDb.getMainImageUrl(),
				vehicleDb.getMainImageBlobName(),
				vehicleDb.getMainImageContainerName()
        );
        vehicleDto.setMainImageContainer(mainImageContainerDto);

       	VehicleModel vehicleModel = vehicleDb.getModel();
        if (vehicleModel != null) {
            vehicleDto.setVehicleModelsCode(vehicleModel.getModelCode());
        }
		vehicleDto.setVinCode(vehicleDb.getVinCode());
		vehicleDto.setPrice(vehicleDb.getPrice());
		vehicleDto.setRegistrationNumber(vehicleDb.getRegistrationNumber());
		vehicleDto.setMileage(vehicleDb.getMileage());
		vehicleDto.setColorInside(vehicleDb.getColorInside());
		vehicleDto.setColorOutside(vehicleDb.getColorOutside());
		vehicleDto.setIsSold(vehicleDb.getIsSold());
		vehicleDto.setFuelCity(vehicleDb.getFuelCity());
		vehicleDto.setFuelHighway(vehicleDb.getFuelHighway());
		vehicleDto.setSafetyStars(vehicleDb.getSafetyStars());

        // Features
        List<VehicleFeature> features = vehicleDb.getFeatures();
        if (features != null) {
            List<FeatureDto> featureDtos = vehicleDb.getFeatures().stream().map(feature -> {
                FeatureDto dto = new FeatureDto();
                dto.setId(feature.getId());
                dto.setText(feature.getText());
                return dto;
            }).collect(Collectors.toList());
            vehicleDto.setFeatures(featureDtos);
        }

        // Images
        List<VehicleImage> images = vehicleDb.getImages();
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
            vehicleDto.setImages(imageDtos);
        }

        // Faults
        List<VehicleFault> faults = vehicleDb.getFaults();
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
            vehicleDto.setFaults(faultsDtos);
        }

		/*
			PERFORMANCE section
		 */
		PerformanceDto performanceDto = new PerformanceDto();
		performanceDto.setCompressionRatio(vehicleDb.getCompressionRatio());
		performanceDto.setCompressionType(vehicleDb.getCompressionType());
		performanceDto.setConfiguration(vehicleDb.getConfiguration());
		performanceDto.setCylinders(vehicleDb.getCylinders());
		performanceDto.setDisplacement(vehicleDb.getDisplacement());
		performanceDto.setFuelType(vehicleDb.getFuelType());
		performanceDto.setSize(vehicleDb.getSize());
		performanceDto.setTorque(vehicleDb.getTorque());
		performanceDto.setTotalValves(vehicleDb.getTotalValves());
		performanceDto.setPowerTrain(vehicleDb.getPowerTrain());
        vehicleDto.setPerformance(performanceDto);

		return vehicleDto;
	}

	public VehicleGeneralDto convertToSearchableVehicle(Vehicle vehicle) {
		VehicleGeneralDto vehicleGeneralDto = new VehicleGeneralDto();
		List<VehicleImage> images = vehicle.getImages();
		if (images != null) {
			VehicleImage primaryImage = images.stream()
					.filter(VehicleImage::isPrimary)
					.findFirst()
					.orElse(new VehicleImage());
			vehicleGeneralDto.setSrc(primaryImage.getImageUrl());
		}

		vehicleGeneralDto.setColorInside(vehicle.getColorInside());
		vehicleGeneralDto.setColorOutside(vehicle.getColorOutside());
		vehicleGeneralDto.setMileage(vehicle.getMileage());

		setVehicleModel(vehicle.getModel(), vehicleGeneralDto);

		return vehicleGeneralDto;
	}

	/**
	 * Helper, convert model to dto to set into vehicleGeneralDto.
	 * @param vehicleModel - source
	 * @param vehicleGeneralDto - destination
	 */
	private void setVehicleModel(VehicleModel vehicleModel, VehicleGeneralDto vehicleGeneralDto) {
		if (vehicleModel == null) {
			return;
		}

		vehicleGeneralDto.setDoors(vehicleModel.getDoors());
		vehicleGeneralDto.setDrive(vehicleModel.getDrive());
		vehicleGeneralDto.setEngine(vehicleModel.getEngine());
		vehicleGeneralDto.setHorsePower(vehicleModel.getHorsePower());
		vehicleGeneralDto.setModel(vehicleModel.getModelCode());
		vehicleGeneralDto.setSeats(vehicleModel.getSeats());
		vehicleGeneralDto.setTransmission(vehicleModel.getTransmission());
		vehicleGeneralDto.setYear(vehicleModel.getYear());

		VehicleManufacturer vehicleManufacturer = vehicleModel.getVehicleManufacturer();
		if (vehicleManufacturer != null) {
			vehicleGeneralDto.setManufacturer(vehicleManufacturer.getManufacturerCode());
        }
	}
}
