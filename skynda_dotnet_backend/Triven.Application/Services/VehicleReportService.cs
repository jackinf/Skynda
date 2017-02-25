using Triven.Application.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Services
{
    public class VehicleReportService : IVehicleReportService<ServiceResult>
    {
        public ServiceResult GetAll()
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult GetSingleBy(int id)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult CreateOrUpdate(VehicleReportViewModel dto)
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