using Triven.Domain.Results;

namespace Triven.Domain.Services
{
    public interface IVehicleFeatureService<out TResult> where TResult : IServiceResult
    {
        TResult GetAllBy(int vehicleId);
        TResult Delete(int id);
    }
}