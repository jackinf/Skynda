using System.Collections.Generic;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleReportItemRepository : BaseCrudRepository<VehicleReportItem>, IVehicleReportItemRepository<VehicleReportItem>
    {
        public IList<VehicleReportItem> GetAllChildren(int parentId)
        {
            using (Context = new ApplicationDbContext())
            {
                return BaseQuery().Where(x => x.Parent.Id == parentId).ToList();
            }
        }
    }
}