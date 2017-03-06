﻿using System.Collections.Generic;
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
            using (Context = new ApplicationDbContext())
            {
                return BaseQuery().FirstOrDefault(x => x.Name == name);
            }
        }

        public IList<Classification> GetByType(string type)
        {
            using (Context = new ApplicationDbContext())
            {

                var query =
                    BaseQuery()
                        .Include(x => x.ClassificationType)
                        .Where(x => x.ClassificationType.Name == type)
                        .ToList();
                return query;
            }
        }

        public IList<Classification> GetByTypeAndVehicleBound(string type)
        {
            using (Context = new ApplicationDbContext())
            {

                switch (type)
                {
                    case DatabaseConstants.ClassificationTypeName.PaymentType:
                        return GetByType(type);
                    case DatabaseConstants.ClassificationTypeName.Drivetrain:
                        return Filter(Context.VehicleModels.Where(x => x.Drivetrain.Id > 0).Select(x => x.Drivetrain.Id));
                    case DatabaseConstants.ClassificationTypeName.Transmission:
                        return
                            Filter(Context.VehicleModels.Where(x => x.Transmission.Id > 0)
                                .Select(x => x.Transmission.Id));
                    case DatabaseConstants.ClassificationTypeName.PaymentStatus:
                        return GetByType(type);
                    case DatabaseConstants.ClassificationTypeName.Manufacturer:
                        return
                            Filter(
                                Context.VehicleModels.Where(x => x.VehicleManufacturer.Id > 0)
                                    .Select(x => x.VehicleManufacturer.Id));
                    case DatabaseConstants.ClassificationTypeName.Fuel:
                        return Filter(Context.VehicleModels.Where(x => x.FuelType.Id > 0).Select(x => x.FuelType.Id));
                    case DatabaseConstants.ClassificationTypeName.VehicleBody:
                        return
                            Filter(Context.VehicleModels.Where(x => x.VehicleBody.Id > 0).Select(x => x.VehicleBody.Id));
                }

                return new List<Classification>();
            }
        }

        private IList<Classification> Filter(IQueryable<int> subQuery)
        {
            using (Context = new ApplicationDbContext())
            {

                if (subQuery.Count() <= 0)
                    return new List<Classification>();

                var existingFuelTypes = subQuery.ToList();
                return
                    BaseQuery()
                        .Where(x => existingFuelTypes.Any(fuelTypeId => fuelTypeId == x.ClassificationType.Id))
                        .ToList();
            }
        }
    }
}
