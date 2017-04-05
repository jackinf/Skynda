using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Entities;
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
                var query = BaseQuery(context)
                    .Include(x => x.VehicleManufacturer);
                query = parameters?.ManufacturerIds.Any() == true 
                    ? query.Where(x => parameters.ManufacturerIds.Any(id => id == x.VehicleManufacturer.Id)) 
                    : query.Where(x => false);
                return query.ToList();
            }
        }

        public VehicleModel GetFullVehicleModel(int id)
        {
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context)
                    .Include(x => x.Drivetrain)                    
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
                return base.Update(id, model, context);
        }

        public IList<VehicleModel> GetAllWithManufacturer()
        {
           return HandleWithContext(dbContext => BaseQuery(dbContext).Include(x => x.VehicleManufacturer).OrderBy(x => x.Id).ToList());
        }
    }
}