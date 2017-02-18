package me.skynda.common.interfaces.daos;

import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.entities.VehicleModel;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.util.List;

public interface IVehicleModelDao extends SkyndaBaseEntityDao<VehicleModel> {

	VehicleModel getByModelCode(String vehicleModelCode);

	void deleteEntity(VehicleModel model, DeleteResponseDto response);
	List<VehicleModel> getAll();
	List<VehicleModel> getAll(Boolean isActive);

}
