using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleRepository : BaseCrudRepository<Vehicle>, IVehicleRepository<Vehicle>
    {
        public Vehicle GetIncluding(int id, bool descriptions = false, bool images = false)
        {
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context).Include(x => x.Images).Include(x => x.Descriptions).FirstOrDefault();
            }
        }


        public IList<Vehicle> Search(SearchRequestViewModel dto)
        {
            using (var context = new ApplicationDbContext())
            {
                var query = BaseQuery(context).Include(x => x.VehicleModel);
                if (dto.Models?.Any() ?? false)
                    query = query.Where(x => dto.Models.Any(model => model.Value == x.VehicleModel.Id));
                if (dto.Brands?.Any() ?? false)
                    query = query.Where(x => dto.Brands.Any(model => model.Value == x.VehicleModel.VehicleManufacturer.Id));
                // TODO: color the world
                //if (dto.Colors?.Any() ?? false)
                //    query = query.Where(x => dto.Colors.Any(model => model.Value == x.Color));
                if (dto.Features?.Any() ?? false)
                    query = query.Where(x => dto.Features.Any(model => x.Features.Any(tt => tt.Id == model.Value)));
                if (dto.Doors?.Any() ?? false)
                    query = query.Where(x => dto.Doors.Any(model => model.Value >= x.VehicleModel.Doors));

                if (dto.Seats?.Any() ?? false)
                    query = query.Where(x => dto.Seats.Any(model => model.Value >= x.VehicleModel.Seats));
                if (dto.Transmission?.Any() ?? false)
                    query = query.Where(x => dto.Transmission.Any(model => model.Value == x.VehicleModel.Transmission.Id));
                if (dto.FuelType?.Any() ?? false)
                    query = query.Where(x => dto.FuelType.Any(model => model.Value == x.VehicleModel.FuelType.Id));
                if (dto.Mileage != null)
                    query = query.Where(x => x.Mileage >= dto.Mileage.Min && x.Mileage <= dto.Mileage.Max);
                if (dto.Price != null)
                    query = query.Where(x => x.Price >= dto.Price.Min && x.Price <= dto.Price.Max);

                if (dto.Year != null)
                    query = query.Where(x => x.VehicleModel.Year >= dto.Year.Min && x.VehicleModel.Year <= dto.Year.Max);
                if (dto.Power != null)
                    query = query.Where(x => x.VehicleModel.HorsePower >= dto.Power.Min && x.VehicleModel.HorsePower <= dto.Power.Max);
                if (dto.PetrolConsumption != null)
                    query = query.Where(x =>
                        x.FuelCity >= dto.PetrolConsumption.Min && x.FuelHighway >= dto.PetrolConsumption.Min ||
                        x.FuelCity <= dto.PetrolConsumption.Max && x.FuelHighway <= dto.PetrolConsumption.Max);

                return query.ToList();
            }
        }

        //public IResult<Vehicle> Add(Vehicle model)
        //{
        //    using (var context = new ApplicationDbContext())
        //    {                
        //        context.Entry(model.VehicleModel).State = EntityState.Unchanged;
        //        context.Entry(model.MainImage).State = EntityState.Unchanged;
        //        return base.Add(model);
        //    }
        //}

        public Vehicle GetDetailed(int id)
        {
            using (var context = new ApplicationDbContext())
            {
                context.Features.Include(c => c.Id);

                var result = BaseQuery(context)
                    .Include(x => x.VehicleModel)
                    .Include(x => x.MainImage)
                    .Include(x => x.Features.Select(o => o.Feature))
                    .Include(x => x.Descriptions)
                    .Include(x => x.Reviews)
                    .Include(x => x.Reports)
                    .Include(x => x.Images.Select(o => o.Image)).FirstOrDefault(x => x.Id == id);

                //TODO fix this loading fault hack... do not load deletedOn items
                if (result != null && result.Features.Any())
                    result.Features = result.Features.Where(x => x.DeletedOn == null).ToList();

                if (result != null && result.Images.Any())
                    result.Images = result.Images.Where(x => x.DeletedOn == null).ToList();

                return result;
            }

        }

    }
}