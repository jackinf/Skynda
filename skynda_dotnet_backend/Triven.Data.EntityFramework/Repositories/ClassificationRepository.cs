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
            return BaseQuery().FirstOrDefault(x => x.Name == name);
        }

        public IList<Classification> GetByType(string type)
        {
            return BaseQuery().Include(x => x.ClassificationType).Where(x => x.ClassificationType.Name == type).ToList();
        }

        public IList<Classification> GetByTypeAndVehicleBound(string type)
        {
            switch (type) 
            {
                case DatabaseConstants.ClassificationTypeName.PAYMENT_TYPE:
                    return GetByType(type);
                case DatabaseConstants.ClassificationTypeName.DRIVETRAIN:
                    return Filter(_context.VehicleModels.Where(x => x.DrivetrainId > 0).Select(x => x.DrivetrainId));
                case DatabaseConstants.ClassificationTypeName.TRANSMISSION:
                    return Filter(_context.VehicleModels.Where(x => x.TransmissionId > 0).Select(x => x.TransmissionId));
                case DatabaseConstants.ClassificationTypeName.PAYMENT_STATUS:
                    return GetByType(type);
                case DatabaseConstants.ClassificationTypeName.MANUFACTURER:
                    return Filter(_context.VehicleModels.Where(x => x.VehicleManufacturerId > 0).Select(x => x.VehicleManufacturerId));
                case DatabaseConstants.ClassificationTypeName.FUEL:
                    return Filter(_context.VehicleModels.Where(x => x.FuelTypeId > 0).Select(x => x.FuelTypeId));
                case DatabaseConstants.ClassificationTypeName.VEHICLE_BODY:
                    return Filter(_context.VehicleModels.Where(x => x.VehicleBodyId > 0).Select(x => x.VehicleBodyId));
            }

            return new List<Classification>();
        }

        private IList<Classification> Filter(IQueryable<int> subQuery)
        {
            if (subQuery.Count() <= 0)
                return new List<Classification>();

            var existingFuelTypes = subQuery.ToList();
            return
                BaseQuery()
                    .Where(x => existingFuelTypes.Any(fuelTypeId => fuelTypeId == x.ClassificationTypeId))
                    .ToList();
        }
    }
}
