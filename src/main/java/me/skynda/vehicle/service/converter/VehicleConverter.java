package me.skynda.vehicle.service.converter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import me.skynda.common.entity.Classification;
import me.skynda.common.entity.Image;
import me.skynda.vehicle.dto.*;
import me.skynda.vehicle.entity.*;
import org.springframework.stereotype.Component;

@Component
public class VehicleConverter {

    public VehicleDisplayDto transform(Vehicle vehicleEntity) {
        VehicleDisplayDto vehicleDto = new VehicleDisplayDto();
        vehicleDto.setId(vehicleEntity.getId());

        convertGeneralData(vehicleEntity, vehicleDto);
        convertOverviewData(vehicleEntity, vehicleDto);
        convertImagesData(vehicleEntity, vehicleDto);
        convertDescriptionData(vehicleEntity, vehicleDto);
        convertFeaturesData(vehicleEntity, vehicleDto);
        convertHistoryData(vehicleEntity, vehicleDto);
        convertPetrolData(vehicleEntity, vehicleDto);
        convertPerformanceData(vehicleEntity, vehicleDto);
        vehicleDto.setSafetyStars(vehicleEntity.getSafetyStars());
        convertReportData(vehicleEntity, vehicleDto);
        convertReviewData(vehicleEntity, vehicleDto);
        vehicleDto.setPrice(vehicleEntity.getPrice());

        return vehicleDto;
    }

    private void convertGeneralData(Vehicle vehicleEntity, VehicleDisplayDto vehicleDisplayDto) {
        VehicleGeneralDto vGeneralDto = new VehicleGeneralDto();
        if (vehicleEntity.getMainImage() != null) {
            vGeneralDto.setSrc(vehicleEntity.getMainImage().getUrl());
        }
        vGeneralDto.setColorInside(vehicleEntity.getColorInside());
        vGeneralDto.setColorOutside(vehicleEntity.getColorOutside());
        setVehicleModel(vehicleEntity.getModel(), vGeneralDto);
        vehicleDisplayDto.setVehicleGeneralDto(vGeneralDto);
    }

    private void convertOverviewData(Vehicle vehicleEntity, VehicleDisplayDto vehicleDisplayDto) {
        List<OverviewDto> overviewDtoList = new ArrayList<OverviewDto>();
        OverviewDto overviewDto = new OverviewDto();
        overviewDto.setIconUrl("hardcodedMileageIconLink");
        overviewDto.setLabel(vehicleEntity.getMileage() != null ? vehicleEntity.getMileage().toString() : "");
        overviewDtoList.add(overviewDto);

        VehicleModel vehicleModel = vehicleEntity.getModel();
        if (vehicleModel != null) {

            if (vehicleModel.getTransmission() != null) {
                overviewDto.setIconUrl("hardcodedTransmissionIconLink");
                overviewDto = new OverviewDto();
                overviewDto.setLabel(vehicleModel.getTransmission().getName());
                overviewDtoList.add(overviewDto);
            }

            overviewDto = new OverviewDto();
            overviewDto.setIconUrl("hardcodedEngineIconLink");
            overviewDto.setLabel(vehicleModel.getEngine() + " (" + vehicleModel.getHorsePower() + ")");
            overviewDtoList.add(overviewDto);

//            overviewDto = new OverviewDto();
//            overviewDto.setIconUrl("hardcodedDriveIconLink");
//            overviewDto.setLabel(vehicleModel.getDrive());
//            overviewDtoList.add(overviewDto);

            overviewDto = new OverviewDto();
            overviewDto.setIconUrl("hardcodedDoorsSeatsIconLink");
            overviewDto.setLabel(vehicleModel.getDoors() + " doors " + vehicleModel.getSeats() + " seats");
            overviewDtoList.add(overviewDto);
        }

        overviewDto = new OverviewDto();
        overviewDto.setIconUrl("hardcodedColorOutsideIconLink");
        overviewDto.setLabel(vehicleEntity.getColorOutside());
        overviewDtoList.add(overviewDto);

        overviewDto = new OverviewDto();
        overviewDto.setIconUrl("hardcodedColorInsideIconLink");
        overviewDto.setLabel(vehicleEntity.getColorInside());
        overviewDtoList.add(overviewDto);

        vehicleDisplayDto.setOverview(overviewDtoList);
    }

    private void convertImagesData(Vehicle vehicle, VehicleDisplayDto vehicleDisplayDto) {
        List<VehicleImage> images = vehicle.getImages();
        if (images == null) {
            return;
        }

        List<String> listOfImages = images.stream()
                .map(VehicleImage::getImage)
                .filter(image -> image != null)
                .map(image -> image.getUrl())
                .collect(Collectors.toList());

        List<ImagesDto> imagesDtoList = new ArrayList<>();
        for (String image : listOfImages) {
            ImagesDto imagesDto = new ImagesDto();
            imagesDto.setImageContainer(ImageContainerDto.Factory.createForDisplay(image));
            imagesDtoList.add(imagesDto);
        }
        vehicleDisplayDto.setImages(imagesDtoList);
    }

    private void convertDescriptionData(Vehicle vehicle, VehicleDisplayDto vehicleDisplayDto) {
        // TODO: (list) vehicle.getDescription(), not vehicle.getModel().getDescription()
        VehicleModel vehicleModel = vehicle.getModel();
        if (vehicleModel != null && vehicleModel.getDescription() != null) {
            List<DescriptionsDto> descriptionsDtoList = new ArrayList<DescriptionsDto>();
            DescriptionsDto descriptionDto = new DescriptionsDto();
            descriptionDto.setText(vehicleModel.getDescription());
            descriptionDto.setTitle(vehicleModel.getTitle());
            descriptionsDtoList.add(descriptionDto);
            vehicleDisplayDto.setDescriptions(descriptionsDtoList);
        }
    }

    private void convertFeaturesData(Vehicle vehicle, VehicleDisplayDto vehicleDisplayDto) {
        if (vehicle.getFeatures() != null) {
            List<String> listOfFeatures = vehicle.getFeatures().stream().map(VehicleFeature::getText).collect(Collectors.toList());
            vehicleDisplayDto.setFeatures(listOfFeatures);
        }
    }

    private void convertHistoryData(Vehicle vehicle, VehicleDisplayDto vehicleDisplayDto) {
        if (vehicle.getFaults() != null) {
            HistoryDto historyDto = new HistoryDto();
            List<String> listOfProblems = vehicle.getFaults().stream().map(VehicleFault::getText).collect(Collectors.toList());
            historyDto.setProblems(listOfProblems);
            historyDto.setVinCode(vehicle.getVinCode());
            vehicleDisplayDto.setHistory(historyDto);
        }
    }

    private void convertPetrolData(Vehicle vehicle, VehicleDisplayDto vehicleDisplayDto) {
        PetrolConsumptionDto petrolConsumptionDto = new PetrolConsumptionDto();
        petrolConsumptionDto.setCity(vehicle.getFuelCity());
        petrolConsumptionDto.setHighWay(vehicle.getFuelHighway());
        petrolConsumptionDto.setAverage(vehicle.getFuelCity(), vehicle.getFuelHighway());
        vehicleDisplayDto.setPetrolConsumption(petrolConsumptionDto);
    }

    private void convertPerformanceData(Vehicle vehicle, VehicleDisplayDto vehicleDisplayDto) {
        PerformanceDto performanceDto = new PerformanceDto();

        VehicleModel vehicleModel = vehicle.getModel();
        if (vehicleModel != null) {
//            performanceDto.setDrivenWheels(vehicleModel.getDrive());	// TODO: Is it needed?
            performanceDto.setDoors(vehicleModel.getDoors());
            performanceDto.setHorsePower(vehicleModel.getHorsePower());
        }

        performanceDto.setCompressionRatio(vehicle.getCompressionRatio());
        performanceDto.setCompressionType(vehicle.getCompressionType());
        performanceDto.setConfiguration(vehicle.getConfiguration());
        performanceDto.setCylinders(vehicle.getCylinders());
        performanceDto.setDisplacement(vehicle.getDisplacement());
//		performanceDto.setFuelType(vehicle.getFuelType());			// TODO: Is it needed?
        performanceDto.setSize(vehicle.getSize());
        performanceDto.setTorque(vehicle.getTorque());
        performanceDto.setTotalValves(vehicle.getTotalValves());
//		performanceDto.setPowerTrain(vehicle.getPowerTrain());		// TODO: Is it needed?
        vehicleDisplayDto.setPerformance(performanceDto);
    }

    private void convertReportData(Vehicle vehicle, VehicleDisplayDto vehicleDisplayDto) {
        // TODO: Is it needed?
        ReportDto reportDto = new ReportDto();
//			reportDto.setCarsForSaleId(reports.getVehicle().getId());
//			reportDto.setFaultsImg(reports.getFaulsImg());
//			reportDto.setFaultsText(reports.getFaultsText());
//			reportDto.setIsPass(reports.getIsPass());
//			reportDto.setPointsText(reports.getPointsText());
//			reportDto.setReportId(reports.getReportId());
//			reportDto.setTitle(reports.getTitle());
//			reportDtoList.add(reportDto);
        vehicleDisplayDto.setReport(reportDto);
    }

    private void convertReviewData(Vehicle vehicle, VehicleDisplayDto vehicleDisplayDto) {
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
        vehicleDisplayDto.setReviews(reviewDtoList);
    }

	/*
    ====================================
	==================================== VEHICLE DTO -> VEHICLE ENTITY
	====================================
	 */

    public Vehicle transform(VehicleDto vehicleDto) {
        Vehicle vehicle = new Vehicle();
        vehicle.setId(vehicleDto.getId());

        // TODO: Is it needed?
//        ImageContainerDto mainImageContainer = vehicleDto.getMainImageContainer();
//        if (mainImageContainer != null) {
//			vehicle.setMainImageUrl(mainImageContainer.getImageUrl());
//			vehicle.setMainImageBlobName(mainImageContainer.getBlobName());
//			vehicle.setMainImageContainerName(mainImageContainer.getContainerName());
//        }

        vehicle.setVinCode(vehicleDto.getVinCode());
        vehicle.setPrice(vehicleDto.getPrice());
        vehicle.setRegistrationNumber(vehicleDto.getRegistrationNumber());
        vehicle.setMileage(vehicleDto.getMileage());
        vehicle.setColorInside(vehicleDto.getColorInside());
        vehicle.setColorOutside(vehicleDto.getColorOutside());
//		vehicle.setIsSold(vehicleDto.getIsSold());					// TODO: Is it needed?
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
//			vehicle.setFuelType(performanceDto.getFuelType());		// TODO: Is it needed?
            vehicle.setSize(performanceDto.getSize());
            vehicle.setTorque(performanceDto.getTorque());
            vehicle.setTotalValves(performanceDto.getTotalValves());
//			vehicle.setPowerTrain(performanceDto.getPowerTrain());	// TODO: Is it needed?
        }

        return vehicle;
    }

	/*
	====================================
	====  CAR MODEL -> CAR DTO
	====================================
	 */

    public VehicleDto transformToVehicleDto(Vehicle vehicleEntity) {
        VehicleDto vehicleDto = new VehicleDto();
        vehicleDto.setId(vehicleEntity.getId());

        Image mainImage = vehicleEntity.getMainImage();
        if (mainImage != null) {
            ImageContainerDto imageContainerDto = ImageContainerDto.Factory.create(
                    mainImage.getUrl(),
                    mainImage.getBlobName(),
                    mainImage.getContainerName()
            );
            vehicleDto.setMainImageContainer(imageContainerDto);
        }

        VehicleModel vehicleModel = vehicleEntity.getModel();
        if (vehicleModel != null) {
            vehicleDto.setVehicleModelsCode(vehicleModel.getModelCode());
        }
        vehicleDto.setVinCode(vehicleEntity.getVinCode());
        vehicleDto.setPrice(vehicleEntity.getPrice());
        vehicleDto.setRegistrationNumber(vehicleEntity.getRegistrationNumber());
        vehicleDto.setMileage(vehicleEntity.getMileage());
        vehicleDto.setColorInside(vehicleEntity.getColorInside());
        vehicleDto.setColorOutside(vehicleEntity.getColorOutside());
//		vehicleDto.setIsSold(vehicleDb.getIsSold());	// TODO: Is sold?
        vehicleDto.setFuelCity(vehicleEntity.getFuelCity());
        vehicleDto.setFuelHighway(vehicleEntity.getFuelHighway());
        vehicleDto.setSafetyStars(vehicleEntity.getSafetyStars());

        // Features
        List<VehicleFeature> features = vehicleEntity.getFeatures();
        if (features != null) {
            List<FeatureDto> featureDtos = vehicleEntity.getFeatures().stream().map(feature -> {
                FeatureDto dto = new FeatureDto();
                dto.setId(feature.getId());
                dto.setText(feature.getText());
                return dto;
            }).collect(Collectors.toList());
            vehicleDto.setFeatures(featureDtos);
        }

        // Images
        List<VehicleImage> images = vehicleEntity.getImages();
        if (images != null) {
            List<ImagesDto> imageDtos = images.stream().map(vehicleImageEntity -> {
                ImagesDto imageDto = new ImagesDto();
                imageDto.setId(vehicleImageEntity.getId());

                Image image = vehicleImageEntity.getImage();
                if (image != null) {
                    ImageContainerDto imageContainerDto = ImageContainerDto.Factory.create(
                            image.getUrl(),
                            image.getBlobName(),
                            image.getContainerName()
                    );
                    imageDto.setImageContainer(imageContainerDto);
                }

                return imageDto;
            }).collect(Collectors.toList());
            vehicleDto.setImages(imageDtos);
        }

        // Faults
        List<VehicleFault> faults = vehicleEntity.getFaults();
        if (faults != null) {
            List<FaultsDto> faultsDtos = faults.stream().map(fault -> {
                FaultsDto faultDto = new FaultsDto();
                faultDto.setId(fault.getId());
                faultDto.setText(fault.getText());

                Image image = fault.getImage();
                if (image != null) {
                    ImageContainerDto imageContainerDto = ImageContainerDto.Factory.create(
                            image.getUrl(),
                            image.getBlobName(),
                            image.getContainerName()
                    );
                    faultDto.setImageContainer(imageContainerDto);
                }

                return faultDto;
            }).collect(Collectors.toList());
            vehicleDto.setFaults(faultsDtos);
        }

		/*
			PERFORMANCE section
		 */
        PerformanceDto performanceDto = new PerformanceDto();
        performanceDto.setCompressionRatio(vehicleEntity.getCompressionRatio());
        performanceDto.setCompressionType(vehicleEntity.getCompressionType());
        performanceDto.setConfiguration(vehicleEntity.getConfiguration());
        performanceDto.setCylinders(vehicleEntity.getCylinders());
        performanceDto.setDisplacement(vehicleEntity.getDisplacement());
//		performanceDto.setFuelType(vehicleDb.getFuelType());	// TODO: Fuel Type?
        performanceDto.setSize(vehicleEntity.getSize());
        performanceDto.setTorque(vehicleEntity.getTorque());
        performanceDto.setTotalValves(vehicleEntity.getTotalValves());
//		performanceDto.setPowerTrain(vehicleDb.getPowerTrain());	// TODO: Power train?
        vehicleDto.setPerformance(performanceDto);

        return vehicleDto;
    }

    public VehicleGeneralDto convertToSearchableVehicle(Vehicle entity) {
        VehicleGeneralDto vehicleGeneralDto = new VehicleGeneralDto();

        if (entity.getMainImage() != null) {
            vehicleGeneralDto.setSrc(entity.getMainImage().getUrl());
        }

        vehicleGeneralDto.setColorInside(entity.getColorInside());
        vehicleGeneralDto.setColorOutside(entity.getColorOutside());
        vehicleGeneralDto.setMileage(entity.getMileage());
        setVehicleModel(entity.getModel(), vehicleGeneralDto);

        return vehicleGeneralDto;
    }

    /**
     * Helper, convert model to dto to set into vehicleGeneralDto.
     *
     * @param entity - source
     * @param dto    - destination
     */
    private void setVehicleModel(VehicleModel entity, VehicleGeneralDto dto) {
        if (entity == null) {
            return;
        }

        dto.setDoors(entity.getDoors());
        Classification drivetrain = entity.getDrivetrain();
        if (drivetrain != null) {
            String name = drivetrain.getName();
            dto.setDrive(name);
        }
        dto.setEngine(entity.getEngine());
        dto.setHorsePower(entity.getHorsePower());
        dto.setModel(entity.getModelCode());
        dto.setSeats(entity.getSeats());
        if (entity.getTransmission() != null) {
            dto.setTransmission(entity.getTransmission().getName());
        }
        dto.setYear(entity.getYear());

        Classification vehicleManufacturer = entity.getVehicleManufacturer();
        if (vehicleManufacturer != null) {
            dto.setManufacturer(vehicleManufacturer.getValue());
        }
    }
}
