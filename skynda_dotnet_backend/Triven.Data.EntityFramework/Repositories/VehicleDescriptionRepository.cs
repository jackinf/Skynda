using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.Results;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleDescriptionRepository : BaseCrudRepository<VehicleDescription>, IVehicleDescriptionRepository<VehicleDescription>
    {
        public IList<VehicleDescription> GetAllVehicleDescriptions(int vehicleId) => BaseQuery().Where(x => x.Vehicle.Id == vehicleId).ToList();

        public override IResult<VehicleDescription> Add(VehicleDescription model)
        {
            Context.Entry(model.Vehicle).State = EntityState.Unchanged;
            return base.Add(model);
        }

        public override IResult<VehicleDescription> Update(int id, VehicleDescription model)
        {
            Context.Entry(model.Vehicle).State = EntityState.Unchanged;
            return base.Update(id, model);
        }
    }
}