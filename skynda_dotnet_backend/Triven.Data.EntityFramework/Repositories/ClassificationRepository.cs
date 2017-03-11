using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Constants;
using Triven.Domain.Repositories;
// ReSharper disable UseMethodAny.0
// ReSharper disable UseMethodAny.3

namespace Triven.Data.EntityFramework.Repositories
{
    public class ClassificationRepository : BaseCrudRepository<Classification>, IClassificationRepository<Classification>
    {
        public Classification FindByName(string name)
        {
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context).FirstOrDefault(x => x.Name == name);
            }
        }

        public IList<Classification> GetByType(string type)
        {
            using (var context = new ApplicationDbContext())
            {

                var query =
                    BaseQuery(context)
                        .Include(x => x.ClassificationType)
                        .Where(x => x.ClassificationType.Name == type)
                        .ToList();
                return query;
            }
        }

        public IList<Classification> GetByTypeAndVehicleBound(string type)
        {
            using (var context = new ApplicationDbContext())
            {

                switch (type)
                {
                    case DatabaseConstants.ClassificationTypeName.PaymentType:
                        return GetByType(type);
                    case DatabaseConstants.ClassificationTypeName.Drivetrain:
                        return Filter(context.VehicleModels.Where(x => x.Drivetrain.Id > 0).Select(x => x.Drivetrain.Id));
                    case DatabaseConstants.ClassificationTypeName.Transmission:
                        return
                            Filter(context.VehicleModels.Where(x => x.Transmission.Id > 0)
                                .Select(x => x.Transmission.Id));
                    case DatabaseConstants.ClassificationTypeName.PaymentStatus:
                        return GetByType(type);
                    case DatabaseConstants.ClassificationTypeName.Manufacturer:
                        return
                            Filter(
                                context.VehicleModels.Where(x => x.VehicleManufacturer.Id > 0)
                                    .Select(x => x.VehicleManufacturer.Id));
                    case DatabaseConstants.ClassificationTypeName.Fuel:
                        return Filter(context.VehicleModels.Where(x => x.FuelType.Id > 0).Select(x => x.FuelType.Id));
                    case DatabaseConstants.ClassificationTypeName.VehicleBody:
                        return
                            Filter(context.VehicleModels.Where(x => x.VehicleBody.Id > 0).Select(x => x.VehicleBody.Id));
                }

                return new List<Classification>();
            }
        }

        private IList<Classification> Filter(IQueryable<int> subQuery)
        {
            using (var context = new ApplicationDbContext())
            {

                if (subQuery.Count() <= 0)
                    return new List<Classification>();

                var existingFuelTypes = subQuery.ToList();
                return
                    BaseQuery(context)
                        .Where(x => existingFuelTypes.Any(fuelTypeId => fuelTypeId == x.ClassificationType.Id))
                        .ToList();
            }
        }
    }
}
