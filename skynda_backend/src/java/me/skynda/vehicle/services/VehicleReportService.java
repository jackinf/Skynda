package me.skynda.vehicle.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.IVehicleFaultDao;
import me.skynda.common.interfaces.daos.IVehicleReportItemDao;
import me.skynda.common.interfaces.daos.IVehicleReportDao;
import me.skynda.common.interfaces.services.IBlobStorageService;
import me.skynda.common.interfaces.services.IVehicleReportService;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.dto.FaultBaseDto;
import me.skynda.vehicle.dto.VehicleReportDto;
import me.skynda.vehicle.dto.VehicleReportItemDto;
import me.skynda.common.entities.VehicleFault;
import me.skynda.common.entities.VehicleReport;
import me.skynda.common.entities.VehicleReportItem;
import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class VehicleReportService implements IVehicleReportService {

    private final IVehicleReportDao dao;
    private final IVehicleReportItemDao itemDao;
    private final Mapper mapper;
    private final IBlobStorageService blobStorageService;
    private final IVehicleFaultDao faultDao;

    private static Logger logger = LoggerFactory.getLogger(VehicleService.class);

    @Autowired
    public VehicleReportService(
            IVehicleReportDao dao,
            IVehicleReportItemDao itemDao, Mapper mapper,
            IBlobStorageService blobStorageService,
            IVehicleFaultDao faultDao) {
        this.dao = dao;
        this.itemDao = itemDao;
        this.mapper = mapper;
        this.blobStorageService = blobStorageService;
        this.faultDao = faultDao;
    }

    @Override
    public List<VehicleReportDto> getAll() {
        try {
            return dao.getAll()
                    .stream()
                    .map(entity -> mapper.map(entity, VehicleReportDto.class))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("getAll failed. ", e);
            throw e;
        }
    }

    @Override
    public List<VehicleReportDto> getAllBy(Serializable vehicleId){
        try {
            List<VehicleReport> vehicleReportList = dao.getAllBy(vehicleId);
            return vehicleReportList.stream().map(entity -> mapper.map(entity, VehicleReportDto.class))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("getAllBy failed. vehicleId: " + vehicleId, e);
            throw e;
        }
    }

    @Override
    public VehicleReportDto getSingleBy(Integer id) {
        try {
            VehicleReport vehicleReport = dao.get(id);
            return mapper.map(vehicleReport, VehicleReportDto.class);
        } catch (Exception e) {
            logger.error("getSingleBy failed. id: " + id, e);
            throw e;
        }
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdate(VehicleReportDto dto, BindingResult bindingResult) {
        try {
            VehicleReport vehicleReport = mapper.map(dto, VehicleReport.class);

            if (dto.getId() != null) {
                vehicleReport = dao.get(dto.getId());
                mapper.map(dto, vehicleReport);
            }

            VehicleReport persistedVehicleReport = dao.saveOrUpdate(vehicleReport);

            UpdateReportItems(dto, persistedVehicleReport.getId());
            CreateOrUpdateResponseDto response = CreateOrUpdateResponseDto.Factory.success(persistedVehicleReport.getId(), true);
            response.setIsModal(dto.getIsModal());
            response.setVehicleId(persistedVehicleReport.getVehicleId());

            return response;
        } catch (Exception e) {
            logger.error("createOrUpdate failed. dto: " + JsonHelper.toJson(dto), e);
            throw e;
        }
    }

    private void UpdateReportItems(VehicleReportDto dto, Integer parentId ) {
        List<VehicleReportItemDto> reportItems = dto.getItems();
        List<FaultBaseDto> faultDtos = dto.getFaults();
        List<VehicleReportItem> existingItems = itemDao.getAllChildren(parentId);
        List<VehicleFault> existingFaults = faultDao.getCategoryFaults(parentId);

        RemoveReportItems(reportItems, existingItems);
        RemoveFaults(faultDtos, existingFaults);

        if(reportItems != null && !reportItems.isEmpty()){

            for (VehicleReportItemDto reportItem : reportItems) {
                VehicleReportItem vehicleReportItem = mapper.map(reportItem, VehicleReportItem.class);

                if(vehicleReportItem.getParentId() == null){
                    vehicleReportItem.setParentId(parentId);
                }

                itemDao.saveOrUpdate(vehicleReportItem);
            }
        }

        if (faultDtos != null) {
            faultDtos.forEach(blobStorageService::fromBase64ToUrl);

            for (FaultBaseDto faultDto : faultDtos) {
                if(faultDto.getReportCategoryId() == null){
                    faultDto.setReportCategoryId(parentId);
                }

                VehicleFault fault = null;

                if  (existingFaults != null){
                    fault = existingFaults.stream().filter(x ->
                            x.getId() == faultDto.getId() &&
                            x.getReportCategoryId() == faultDto.getReportCategoryId()).findFirst().orElse(null);
                }
                Image existingImage = fault != null ? fault.getImage() : null;
                Image image = blobStorageService.handleMedia(faultDto.getImage(), existingImage);
                fault = mapper.map(faultDto, VehicleFault.class);
                fault.setImage(image);
                faultDao.saveOrUpdate(fault);
            }
        }
    }

    private void RemoveReportItems(List<VehicleReportItemDto> reportItems, List<VehicleReportItem> existingItems) {

        if(existingItems != null){

            for (VehicleReportItem item : existingItems) {

                Boolean exists = reportItems != null &&
                        !reportItems.isEmpty() &&
                        reportItems.stream().map(VehicleReportItemDto::getId)
                            .anyMatch(item.getId()::equals);

                if(!exists) {
                    DeleteResponseDto response = new DeleteResponseDto();
                    itemDao.deleteEntity(item, response);
                }
            }

        }
    }

    private void RemoveFaults(List<FaultBaseDto> faults, List<VehicleFault> existingFaults){

        if(existingFaults != null){
            for (VehicleFault fault : existingFaults){
                Boolean exists = faults != null &&
                        !faults.isEmpty() &&
                        faults.stream().map(FaultBaseDto::getId)
                            .anyMatch(fault.getId()::equals);

                if(!exists) {
                    DeleteResponseDto response = new DeleteResponseDto();
                    faultDao.deleteEntity(fault, response);
                }
            }
        }
    }


    @Override
    public DeleteResponseDto delete(Integer id) {
        try {
            DeleteResponseDto response = new DeleteResponseDto();
            VehicleReport report = dao.get(id);
            VehicleReportDto dto = mapper.map(report, VehicleReportDto.class);
            List<VehicleReportItem> existingItems = itemDao.getAllChildren(id);
            List<VehicleFault> existingFaults = faultDao.getActiveFaults(id);
            RemoveReportItems(null, existingItems);
            RemoveFaults(null, existingFaults);
            dao.deleteEntity(report, response);
            return response;
        } catch (Exception e) {
            logger.error("delete failed. id: " + id, e);
            return DeleteResponseDto.Factory.fail(e.getMessage());
        }
    }

}
