using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleRepository : BaseCrudRepository<Vehicle>, IVehicleRepository<Vehicle>
    {
        public IList<Vehicle> Search(SearchRequestViewModel dto)
        {
            var query = BaseQuery().Include(x => x.VehicleModel);
            if (dto.Models?.Any() ?? false)
                query = query.Where(x => dto.Models.Any(model => model.Value == x.ModelId));
            if (dto.Brands?.Any() ?? false)
                query = query.Where(x => dto.Brands.Any(model => model.Value == x.VehicleModel.VehicleManufacturerId));
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
                query = query.Where(x => dto.Transmission.Any(model => model.Value == x.VehicleModel.TransmissionId));
            if (dto.FuelType?.Any() ?? false)
                query = query.Where(x => dto.FuelType.Any(model => model.Value == x.VehicleModel.FuelTypeId));
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
}