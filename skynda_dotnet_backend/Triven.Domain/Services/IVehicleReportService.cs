using System.Collections.Generic;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Domain.Services
{
    public interface IVehicleReportService
    {
        ServiceResult<IEnumerable<VehicleReportViewModel>> GetAll();
        ServiceResult<VehicleReportViewModel> Get(int id);
        ServiceResult<VehicleReportViewModel> Create(int vehicleId, VehicleReportViewModel dto);
        ServiceResult<VehicleReportViewModel> Update(int vehicleId, int id, VehicleReportViewModel dto);
        ServiceResult<bool> Delete(int id);
        ServiceResult<IList<VehicleReportViewModel>> GetAllBy(int vehicleId);
    }
}