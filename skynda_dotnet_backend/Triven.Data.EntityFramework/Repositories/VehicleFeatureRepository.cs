using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.Results;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleFeatureRepository : BaseCrudRepository<VehicleFeature>, IVehicleFeatureRepository<VehicleFeature>
    {
        public IList<VehicleFeature> GetAllBy(int vehicleId) => BaseQuery()
            .Include(x => x.Vehicle)
            .Include(x => x.Feature)
            .Where(x => x.Vehicle.Id == vehicleId).ToList();

        public IList<VehicleFeature> GetAllBy(int vehicleId, bool isActive) 
            => BaseQuery().Where(x => x.Vehicle.Id == vehicleId && x.IsArchived == !isActive).ToList();

        public override IResult<VehicleFeature> Add(VehicleFeature model)
        {
            Context.Entry(model.Feature).State = EntityState.Unchanged;
            Context.Entry(model.Vehicle).State = EntityState.Unchanged;
            return base.Add(model);
        }
    }
}