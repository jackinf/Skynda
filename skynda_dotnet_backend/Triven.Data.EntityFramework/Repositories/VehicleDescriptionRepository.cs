﻿using System.Collections.Generic;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleDescriptionRepository : BaseCrudRepository<VehicleDescription>, IVehicleDescriptionRepository<VehicleDescription>
    {
        public IList<VehicleDescription> GetAllVehicleDescriptions(int vehicleId) => BaseQuery().Where(x => x.VehicleId == vehicleId).ToList();
    }
}