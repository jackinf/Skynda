using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Domain.Services
{
    public interface IVehicleReviewService<out TResult> where TResult : IServiceResult
    {
        TResult GetAll();
        TResult Get(int id);
        TResult Create(VehicleReviewViewModel dto);
        TResult Update(int id, VehicleReviewViewModel dto);
        TResult Delete(int id);
        TResult GetAllBy(int vehicleId);
    }
}