﻿using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.UnitOfWorks;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleFeatureRepository : BaseCrudRepository<VehicleFeature>, IVehicleFeatureRepository<VehicleFeature>
    {
        public IList<VehicleFeature> GetAllBy(int vehicleId)
        {
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context)
                    .Include(x => x.Vehicle)
                    .Include(x => x.Feature)
                    .Where(x => x.Vehicle.Id == vehicleId).ToList();
            }
        }

        public IList<VehicleFeature> GetAllBy(int vehicleId, bool isActive)
        {
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context).Where(x => x.Vehicle.Id == vehicleId && x.IsArchived == !isActive).ToList();
            }
        }

        public override IResult<VehicleFeature> Add(VehicleFeature model, IDbContext context = null)
        {
            return HandleWithContext(context, dbContext =>
            {
                //if (model.Feature != null)
                //    dbContext.Entry(model.Feature).State = EntityState.Unchanged;
                //if (model.Vehicle != null)
                //    dbContext.Entry(model.Vehicle).State = EntityState.Unchanged;
                return base.Add(model, dbContext);
            });

        }
    }
}