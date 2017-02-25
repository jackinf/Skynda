using Triven.Domain.Results;

namespace Triven.Domain.Services
{
    public interface IClassificationService<out TResult> where TResult : IServiceResult
    {
        TResult GetByType(string param);
        TResult GetByTypeAndVehicleBound(string param);
    }
}
