using System.Collections.Generic;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.ViewModels.Common;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleReportRepository : BaseCrudRepository<VehicleReport>, IVehicleReportRepository<VehicleReport>
    {
        public void DeleteEntity(VehicleReport report, DeleteResponseViewModel response)
        {
            throw new System.NotImplementedException();
        }

        public VehicleReport Get(int id, bool isActive = true)
        {
            throw new System.NotImplementedException();
        }

        public List<VehicleReport> GetAll(bool isActive = true)
        {
            throw new System.NotImplementedException();
        }

        public IList<VehicleReport> GetAllBy(int vehicleId)
        {
            throw new System.NotImplementedException();
        }

        public IList<VehicleReport> GetAllBy(int vehicleId, bool isActive)
        {
            throw new System.NotImplementedException();
        }
    }
}