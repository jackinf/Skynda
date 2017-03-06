using System.Collections.Generic;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleReportRepository : BaseCrudRepository<VehicleReport>, IVehicleReportRepository<VehicleReport>
    {
        public IList<VehicleReport> GetAllBy(int vehicleId)
        {
            using (Context = new ApplicationDbContext())
            {
                return BaseQuery().Where(x => x.Vehicle.Id == vehicleId).ToList();
            }
        }
    }
}