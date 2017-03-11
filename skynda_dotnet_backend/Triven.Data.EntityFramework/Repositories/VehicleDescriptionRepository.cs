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
        public IList<VehicleDescription> GetAllVehicleDescriptions(int vehicleId)
        {
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context).Where(x => x.Vehicle.Id == vehicleId).ToList();
            }
        }

        public IResult<VehicleDescription> Add(VehicleDescription model)
        {
            using (var context = new ApplicationDbContext())
            {
                context.Entry(model.Vehicle).State = EntityState.Unchanged;
                return base.Add(model, context);
            }
        }

        public IResult<VehicleDescription> Update(int id, VehicleDescription model)
        {
            using (var context = new ApplicationDbContext())
            {
                context.Entry(model.Vehicle).State = EntityState.Unchanged;
                return base.Update(id, model, context);
            }
        }
    }
}