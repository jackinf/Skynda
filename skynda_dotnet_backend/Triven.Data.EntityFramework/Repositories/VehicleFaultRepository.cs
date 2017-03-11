using System.Collections.Generic;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleFaultRepository : BaseCrudRepository<VehicleFault>, IVehicleFaultRepository<VehicleFault>
    {
        public IList<VehicleFault> GetCategoryFaults(int categoryId)
        {
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context).Where(x => x.VehicleReport.Id == categoryId).ToList();
            }
        }
    }
}