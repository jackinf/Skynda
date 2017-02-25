using System.Collections.Generic;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.ViewModels.Common;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleDescriptionRepository : BaseCrudRepository<VehicleDescription>, IVehicleDescriptionRepository<VehicleDescription>
    {
        public IList<VehicleDescription> GetAllVehicleDescriptions(int vehicleId)
        {
            return BaseQuery().Where(x => x.VehicleId == vehicleId).ToList();
        }

        public void DeleteEntity(VehicleDescription vehicleDescription, DeleteResponseViewModel response)
        {
            throw new System.NotImplementedException();
        }

        public VehicleDescription SaveOrUpdate(VehicleDescription vehicleReportItem)
        {
            throw new System.NotImplementedException();
        }

        public void SaveOrUpdate(ICollection<VehicleDescription> items)
        {
            throw new System.NotImplementedException();
        }
    }
}