using Triven.Application.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Feature;

namespace Triven.Application.Services
{
    public class FeatureService : IFeatureService<ServiceResult>
    {
        public ServiceResult GetAll()
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetAllForAdminSelect()
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetSingleBy(int id)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult CreateOrUpdate(FeatureViewModel dto)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult Delete(int id)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetAllBy(int vehicleId)
        {
            throw new System.NotImplementedException();
        }
    }
}