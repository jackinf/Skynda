using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Models;
using Triven.Domain.Repositories;
using Triven.Domain.ViewModels.Image;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleImageRepository : BaseCrudRepository<VehicleImage>, IVehicleImageRepository<VehicleImage>
    {
        public IList<VehicleImage> GetAllVehicleImages(int vehicleId)
        {
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context)
                    .Include(x => x.Image)
                    .Include(x => x.Vehicle)
                .Where(x => x.Vehicle.Id == vehicleId).ToList();
            }
        }
    }
}