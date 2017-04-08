using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Entities;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.UnitOfWorks;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleDescriptionRepository : BaseCrudRepository<VehicleDescription>, IVehicleDescriptionRepository<VehicleDescription>
    {
        public IList<VehicleDescription> GetAllVehicleDescriptions(int vehicleId, IDbContext context = null) 
            => HandleWithContext(context, dbContext =>
            {
                return BaseQuery(dbContext).Where(x => x.Vehicle.Id == vehicleId).ToList();
            });

        public override IResult<VehicleDescription> Add(VehicleDescription model, IDbContext context = null)
        {
            return HandleWithContext(context, dbContext =>
            {
                //dbContext.Entry(model.Vehicle).State = EntityState.Unchanged;
                return base.Add(model, dbContext);
            });
        }

        //    public override IResult<VehicleDescription> Update(int id, VehicleDescription model, IDbContext context = null)
        //    {
        //        return HandleWithContext(context, dbContext =>
        //        {
        //            //dbContext.Entry(model.Vehicle).State = EntityState.Unchanged;
        //            return base.Update(id, model, dbContext);
        //        });
        //    }
    }
}