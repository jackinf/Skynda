using System.Collections.Generic;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.ViewModels.Common;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleReportItemRepository : BaseCrudRepository<VehicleReportItem>, IVehicleReportItemRepository<VehicleReportItem>
    {
        public VehicleReportItem SaveOrUpdate(VehicleReportItem vehicleReportItem)
        {
            throw new System.NotImplementedException();
        }

        public void SaveOrUpdate(ICollection<VehicleReportItem> items)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteEntity(VehicleReportItem vehicleReportItem, DeleteResponseViewModel response)
        {
            throw new System.NotImplementedException();
        }

        public IList<VehicleReportItem> GetAllChildren(int parentId)
        {
            throw new System.NotImplementedException();
        }

        public IList<VehicleReportItem> GetActiveItems(int parentId)
        {
            throw new System.NotImplementedException();
        }
    }
}