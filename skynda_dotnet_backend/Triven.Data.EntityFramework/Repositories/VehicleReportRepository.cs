using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.Results;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleReportRepository : BaseCrudRepository<VehicleReport>, IVehicleReportRepository<VehicleReport>
    {
        public IList<VehicleReport> GetAllBy(int vehicleId)
        {
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context).Where(x => x.Vehicle.Id == vehicleId).ToList();
            }
        }

        public IResult<VehicleReport> Add(int vehicleId, VehicleReport entity)
        {
            entity.VehicleId = vehicleId;
            return base.Add(entity);
        }

        public IResult<VehicleReport> Update(int vehicleId, int id, VehicleReport entity)
        {
            using (var context = new ApplicationDbContext())
            {
                entity.VehicleId = vehicleId;                
                return base.Update(id, entity, context);
            }
            
        }

        public VehicleReport GetFull(int id)
        {
            return HandleWithContext(dbContext => BaseQuery(dbContext)
                .Include(x => x.Faults.Select(i => i.Image))
                .Include(x => x.Items)
                .FirstOrDefault(x => x.Id == id)
            );
        }
    }
}