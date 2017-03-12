using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleModelRepository : BaseCrudRepository<VehicleModel>, IVehicleModelRepository<VehicleModel>
    {
        public VehicleModel GetByModelCode(string vehicleModelCode)
        {
            using (var context = new ApplicationDbContext())
                return BaseQuery(context).FirstOrDefault(x => x.ModelCode == vehicleModelCode);
        }

        public IList<VehicleModel> Search(VehicleModelSearchRequestViewModel parameters)
        {
            using (var context = new ApplicationDbContext())
            {
                return
                    BaseQuery(context)
                        .Include(x => x.VehicleManufacturer)
                        .Where(x => parameters.ManufacturerIds.Any(id => id == x.VehicleManufacturer.Id))
                        .ToList();
            }
        }

        public VehicleModel GetFullVehicleModel(int id)
        {
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context)
                    .Include(x => x.Drivetrain)
                    .Include(x => x.FuelType)
                    .Include(x => x.Transmission)
                    .Include(x => x.VehicleBody)
                    .Include(x => x.VehicleManufacturer)
                    .FirstOrDefault(x => x.Id == id);
            }
        }

        public IResult<VehicleModel> Add(VehicleModel model)
        {
            using (var context = new ApplicationDbContext())
                return base.Add(model, context);
        }

        public IResult<VehicleModel> Update(int id, VehicleModel model)
        {
            using (var context = new ApplicationDbContext())
            {
                context.Entry(model.Drivetrain).State = EntityState.Unchanged;
                context.Entry(model.FuelType).State = EntityState.Unchanged;
                context.Entry(model.Transmission).State = EntityState.Unchanged;
                context.Entry(model.VehicleBody).State = EntityState.Unchanged;
                context.Entry(model.VehicleManufacturer).State = EntityState.Unchanged;
                return base.Update(id, model, context);
            }
        }
    }
}