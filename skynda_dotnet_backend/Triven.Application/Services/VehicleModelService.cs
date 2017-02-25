using System.Linq;
using System.Web.Helpers;
using Triven.Application.Results;
using Triven.Domain.Repositories;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Application.Services
{
    public class VehicleModelService : IVehicleModelService<ServiceResult>
    {
        public ServiceResult GetAll()
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult Get(int id)
        {
            var list = IoC.Get<IClassificationRepository<>>().GetByType();
            var item = list[32];
            throw new System.NotImplementedException();
        }

        public ServiceResult CreateOrUpdate(VehicleModelViewModel vehicleModelAdminDto)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult Delete(int id)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult Search(VehicleModelSearchRequestViewModel dto)
        {
            throw new System.NotImplementedException();
        }
    }
}