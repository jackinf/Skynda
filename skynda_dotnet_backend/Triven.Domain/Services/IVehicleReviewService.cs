using System.Collections.Generic;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Domain.Services
{
    public interface IVehicleReviewService
    {
        ServiceResult<IEnumerable<VehicleReviewViewModel>> GetAll();
        ServiceResult<VehicleReviewViewModel> Get(int id);
        ServiceResult<VehicleReviewViewModel> Create(VehicleReviewViewModel dto);
        ServiceResult<VehicleReviewViewModel> Update(int id, VehicleReviewViewModel dto);
        ServiceResult<bool> Delete(int id);
        ServiceResult<IList<VehicleReviewViewModel>> GetAllBy(int vehicleId);
    }
}