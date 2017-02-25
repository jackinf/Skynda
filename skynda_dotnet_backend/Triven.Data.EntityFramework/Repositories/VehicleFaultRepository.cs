using System.Collections.Generic;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.ViewModels.Common;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleFaultRepository : BaseCrudRepository<VehicleFault>, IVehicleFaultRepository<VehicleFault>
    {
        public IList<VehicleFault> GetCategoryFaults(int categoryId)
        {
            throw new System.NotImplementedException();
        }
        
        public IList<VehicleFault> GetActiveFaults(int reportCategoryId)
        {
            throw new System.NotImplementedException();
        }
    }
}