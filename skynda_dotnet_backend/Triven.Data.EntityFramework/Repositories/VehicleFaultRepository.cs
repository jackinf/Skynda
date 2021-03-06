﻿using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Entities;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleFaultRepository : BaseCrudRepository<VehicleFault>, IVehicleFaultRepository<VehicleFault>
    {
        public IList<VehicleFault> GetCategoryFaults(int reportId)
        {
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context)
                    .Include(x => x.Image)
                    .Where(x => x.VehicleReport.Id == reportId).ToList();
            }
        }
    }
}