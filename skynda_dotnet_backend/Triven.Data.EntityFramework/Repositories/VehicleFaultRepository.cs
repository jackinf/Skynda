using System.Collections.Generic;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleFaultRepository : BaseCrudRepository<VehicleFault>, IVehicleFaultRepository<VehicleFault>
    {
        public IList<VehicleFault> GetCategoryFaults(int categoryId) => BaseQuery().Where(x => x.VehicleReportId == categoryId).ToList();
    }
}