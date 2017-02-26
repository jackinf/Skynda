using Triven.Application.Results;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Services;

namespace Triven.Application.Services
{
    public class ClassificationService : IClassificationService<ServiceResult>
    {
        private readonly IClassificationRepository<Classification> _classificationRepository;

        public ClassificationService()
        {
            _classificationRepository = IoC.Get<IClassificationRepository<Classification>>();
        }

        public ServiceResult GetByType(string type)
        {
            var result = _classificationRepository.GetByType(type);
            return ServiceResult.Factory.Success(result);
        }

        public ServiceResult GetByTypeAndVehicleBound(string type)
        {
            var result = _classificationRepository.GetByTypeAndVehicleBound(type);
            return ServiceResult.Factory.Success(result);
        }
    }
}