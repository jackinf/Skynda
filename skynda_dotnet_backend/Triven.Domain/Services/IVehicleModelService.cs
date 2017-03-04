using System.Collections.Generic;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Domain.Services
{
    public interface IVehicleModelService
    {
        ServiceResult<IEnumerable<VehicleModelViewModel>> GetAll();
        ServiceResult<VehicleModelViewModel> Get(int id);
        ServiceResult<VehicleModelViewModel> Create(VehicleModelViewModel vehicleModelAdminDto);
        ServiceResult<VehicleModelViewModel> Update(int id, VehicleModelViewModel vehicleModelAdminDto);
        ServiceResult<bool> Delete(int id);
        ServiceResult<IList<VehicleModelViewModel>> Search(VehicleModelSearchRequestViewModel viewModel);
    }
}