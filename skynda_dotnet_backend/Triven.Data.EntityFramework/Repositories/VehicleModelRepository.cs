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
        public VehicleModel GetByModelCode(string vehicleModelCode) => BaseQuery().FirstOrDefault(x => x.ModelCode == vehicleModelCode);

        public IList<VehicleModel> Search(VehicleModelSearchRequestViewModel parameters)
        {
            using (Context = new ApplicationDbContext())
            {
                return
                    BaseQuery()
                        .Include(x => x.VehicleManufacturer)
                        .Where(x => parameters.ManufacturerIds.Any(id => id == x.VehicleManufacturer.Id))
                        .ToList();
            }
        }

        public VehicleModel GetFullVehicleModel(int id)
        {
            using (Context = new ApplicationDbContext())
            {
                return BaseQuery()
                    .Include(x => x.Drivetrain)
                    .Include(x => x.FuelType)
                    .Include(x => x.Transmission)
                    .Include(x => x.VehicleBody)
                    .Include(x => x.VehicleManufacturer)
                    .FirstOrDefault(x => x.Id == id);
            }
        }

        public override IResult<VehicleModel> Add(VehicleModel model)
        {
            using (Context = new ApplicationDbContext())
            {
                Context.Entry(model.Drivetrain).State = EntityState.Unchanged;
                Context.Entry(model.FuelType).State = EntityState.Unchanged;
                Context.Entry(model.Transmission).State = EntityState.Unchanged;
                Context.Entry(model.VehicleBody).State = EntityState.Unchanged;
                Context.Entry(model.VehicleManufacturer).State = EntityState.Unchanged;
                return base.Add(model);
            }
        }

        public override IResult<VehicleModel> Update(int id, VehicleModel model)
        {
            using (Context = new ApplicationDbContext())
            {
                Context.Entry(model.Drivetrain).State = EntityState.Unchanged;
                Context.Entry(model.FuelType).State = EntityState.Unchanged;
                Context.Entry(model.Transmission).State = EntityState.Unchanged;
                Context.Entry(model.VehicleBody).State = EntityState.Unchanged;
                Context.Entry(model.VehicleManufacturer).State = EntityState.Unchanged;
                return base.Update(id, model);
            }
        }
    }
}