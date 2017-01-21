package me.skynda.vehicle.services;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.daos.IVehicleReportItemDao;
import me.skynda.common.interfaces.daos.IVehicleReportDao;
import me.skynda.common.interfaces.services.IBlobStorageService;
import me.skynda.common.interfaces.services.IVehicleReportService;
import me.skynda.vehicle.dto.FaultBaseDto;
import me.skynda.vehicle.dto.VehicleReportDto;
import me.skynda.vehicle.dto.VehicleReportItemDto;
import me.skynda.vehicle.entities.VehicleReport;
import me.skynda.vehicle.entities.VehicleReportItem;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class VehicleReportService implements IVehicleReportService {

    private final IVehicleReportDao dao;
    private final IVehicleReportItemDao itemDao;
    private final Mapper mapper;
    private final IBlobStorageService blobStorageService;

    @Autowired
    public VehicleReportService(IVehicleReportDao dao,
                                IVehicleReportItemDao itemDao, Mapper mapper,
                                IBlobStorageService blobStorageService) {
        this.dao = dao;
        this.itemDao = itemDao;
        this.mapper = mapper;
        this.blobStorageService = blobStorageService;
    }

    @Override
    public List<VehicleReportDto> getAll() {
        return dao.getAll()
                .stream()
                .map(entity -> mapper.map(entity, VehicleReportDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public VehicleReportDto getSingleBy(Integer id) {
        VehicleReport vehicleReport = dao.get(id);
        return mapper.map(vehicleReport, VehicleReportDto.class);
    }

    @Override
    public CreateOrUpdateResponseDto createOrUpdate(VehicleReportDto dto, BindingResult bindingResult) {

        VehicleReport vehicleReport = mapper.map(dto, VehicleReport.class);

        if (dto.getId() != null) {
            vehicleReport = dao.get(dto.getId());
            mapper.map(dto, vehicleReport);
        }

        VehicleReport persistedVehicleReport = dao.saveOrUpdate(vehicleReport);

        UpdateReportItems(dto, persistedVehicleReport.getId());

        List<FaultBaseDto> faultDtos = dto.getFaults();

        if (faultDtos != null) {
            faultDtos.forEach(blobStorageService::fromBase64ToUrl);
        }

        return CreateOrUpdateResponseDto.Factory.success(persistedVehicleReport.getId(), true);
    }

    private void UpdateReportItems(VehicleReportDto dto, Integer parentId) {
        List<VehicleReportItemDto> reportItems = dto.getItems();

        RemoveReportItems(parentId, reportItems);

        if(reportItems != null && !reportItems.isEmpty()){

            for (VehicleReportItemDto reportItem : reportItems) {
                VehicleReportItem vehicleReportItem = mapper.map(reportItem, VehicleReportItem.class);

                if(vehicleReportItem.getParentId() == null){
                    vehicleReportItem.setParentId(parentId);
                }

                itemDao.saveOrUpdate(vehicleReportItem);
            }
        }
    }

    private void RemoveReportItems(Integer parentId, List<VehicleReportItemDto> reportItems) {
        List<VehicleReportItem> existingItems = itemDao.getAllChildren(parentId);

        if(existingItems != null){

            for (VehicleReportItem item : existingItems) {

                Boolean exists = !reportItems.isEmpty() && reportItems.stream()
                        .map(VehicleReportItemDto::getId)
                        .anyMatch(item.getId()::equals);

                if(!exists) {
                    DeleteResponseDto response = new DeleteResponseDto();
                    itemDao.deleteEntity(item, response);
                }
            }

        }
    }


    @Override
    public DeleteResponseDto delete(Integer id) {
        DeleteResponseDto response = new DeleteResponseDto();
        VehicleReport report = dao.get(id);
        VehicleReportDto dto = mapper.map(report, VehicleReportDto.class);
        RemoveReportItems(id, dto.getItems());
        dao.deleteEntity(report, response);
        return response;
    }

}
