using System.Collections.Generic;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Domain.Services
{
    public interface IVehicleFeatureService
    {
        ServiceResult<IList<VehicleFeatureViewModel>> GetAllBy(int vehicleId);
        ServiceResult<bool> Delete(int id);
    }
}