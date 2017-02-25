using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Domain.Services
{
    public interface IVehicleReportService<out TResult> where TResult : IServiceResult
    {
        TResult GetAll();
        TResult GetSingleBy(int id);
        TResult CreateOrUpdate(VehicleReportViewModel dto);
        TResult Delete(int id);
        TResult GetAllBy(int vehicleId);
    }
}