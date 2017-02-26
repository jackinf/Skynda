using System.Collections.Generic;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleFeatureRepository : BaseCrudRepository<VehicleFeature>, IVehicleFeatureRepository<VehicleFeature>
    {
        public IList<VehicleFeature> GetAllBy(int vehicleId) => BaseQuery().Where(x => x.VehicleId == vehicleId).ToList();
        public IList<VehicleFeature> GetAllBy(int vehicleId, bool isActive) 
            => BaseQuery().Where(x => x.VehicleId == vehicleId && x.IsArchived == !isActive).ToList();
    }
}