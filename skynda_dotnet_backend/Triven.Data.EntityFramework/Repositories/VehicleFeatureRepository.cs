using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.ViewModels.Common;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleFeatureRepository : BaseCrudRepository<VehicleFeature>, IVehicleFeatureRepository<VehicleFeature>
    {
        public IList<VehicleFeature> GetAllBy(int vehicleId)
        {
            return BaseQuery().Where(x => x.VehicleId == vehicleId).ToList();
        }

        public IList<VehicleFeature> GetAllBy(int vehicleId, bool isActive)
        {
            return BaseQuery().Where(x => x.VehicleId == vehicleId && x.IsArchived == !isActive).ToList();
        }

        public void DeleteEntity(VehicleFeature vehicleDescription, DeleteResponseViewModel response)
        {
            using (var context = new ApplicationDbContext())
            {
                var toDelete = BaseQuery(context).FirstOrDefault(x => x.Id == vehicleDescription.Id);
                if (toDelete == null)
                    throw new Exception("Sitt juhtus. Service, püüa mind.");
                //_context.Entry(toDelete).State = EntityState.Modified;
                toDelete.DeletedOn = DateTime.Now;
                context.SaveChanges();
            }
        }
    }
}