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
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context).Where(x => x.Parent.Id == parentId).ToList();
            }
        }
    }
}