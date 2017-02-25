using Triven.Application.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Application.Services
{
    public class VehicleService : IVehicleService<ServiceResult>
    {
        public ServiceResult GetVehicles()
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult CreateOrUpdateVehicle(VehicleAdminViewModel vehicleAdminDto)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetVehicle(int id)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetVehicleDetailed(int id)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult DeleteVehicle(int id)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult Search(SearchRequestViewModel parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}