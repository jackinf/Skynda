using Triven.Application.Results;
using Triven.Domain.Services;

namespace Triven.Application.Services
{
    public class ClassificationService : IClassificationService<ServiceResult>
    {
        public ServiceResult GetByType(string param)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetByTypeAndVehicleBound(string param)
        {
            throw new System.NotImplementedException();
        }
    }
}