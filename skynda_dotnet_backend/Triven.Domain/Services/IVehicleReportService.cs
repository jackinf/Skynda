using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Domain.Services
{
    public interface IVehicleReportService<out TResult> where TResult : IServiceResult
    {
        TResult GetAll();
        TResult Get(int id);
        TResult Create(VehicleReportViewModel dto);
        TResult Update(int id, VehicleReportViewModel dto);
        TResult Delete(int id);
        TResult GetAllBy(int vehicleId);
    }
}