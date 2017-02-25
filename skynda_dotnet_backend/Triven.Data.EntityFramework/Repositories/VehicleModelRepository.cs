using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleModelRepository : BaseCrudRepository<VehicleModel>, IVehicleModelRepository<VehicleModel>
    {
        public VehicleModel GetByModelCode(string vehicleModelCode) => BaseQuery().FirstOrDefault(x => x.ModelCode == vehicleModelCode);

        public IList<VehicleModel> Search(VehicleModelSearchRequestViewModel parameters)
        {
            return
                BaseQuery()
                    .Include(x => x.VehicleManufacturer)
                    .Where(x => parameters.ManufacturerIds.Any(id => id == x.VehicleManufacturerId))
                    .ToList();
        }
    }
}