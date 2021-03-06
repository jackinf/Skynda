﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Triven.Data.EntityFramework.Entities;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Constants;
using Triven.Domain.Enums;
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
                Func<ApplicationDbContext, IQueryable<Vehicle>> baseQuery = c => c.Vehicles.Where(x => x.VehicleStatusString == VehicleStatus.Published.ToString()).Include(x => x.VehicleModel);

                switch (type)
                {
                    case DatabaseConstants.ClassificationTypeName.PaymentType:
                        return GetByType(type);
                    case DatabaseConstants.ClassificationTypeName.Drivetrain:
                    {
                        var query = baseQuery(context)
                            .Where(x => x.VehicleModel != null && x.VehicleModel.Drivetrain.Id > 0)
                            .Join(context.Classifications,
                                vehicle => vehicle.VehicleModel.Drivetrain.Id,
                                classification => classification.Id,
                                (vehicle, classification) => classification);

                        return query.Distinct().ToList();
                    }
                    case DatabaseConstants.ClassificationTypeName.Transmission:
                    {
                        var query = baseQuery(context)
                            .Where(x => x.VehicleModel != null && x.Transmission.Id > 0)
                            .Join(context.Classifications,
                                vehicle => vehicle.Transmission.Id,
                                classification => classification.Id,
                                (vehicle, classification) => classification);

                        return query.Distinct().ToList();
                    }
                    case DatabaseConstants.ClassificationTypeName.PaymentStatus:
                        return GetByType(type);
                    case DatabaseConstants.ClassificationTypeName.Manufacturer:
                    {
                        var query = baseQuery(context)
                            .Where(x => x.VehicleModel != null && x.VehicleModel.VehicleManufacturer.Id > 0)
                            .Join(context.Classifications,
                                vehicle => vehicle.VehicleModel.VehicleManufacturer.Id,
                                classification => classification.Id,
                                (vehicle, classification) => classification);

                        return query.Distinct().ToList();
                    }
                    case DatabaseConstants.ClassificationTypeName.Fuel:
                    {
                        var query = baseQuery(context)
                            .Where(x => x.VehicleModel != null && x.FuelType.Id > 0)
                            .Join(context.Classifications,
                                vehicle => vehicle.FuelType.Id,
                                classification => classification.Id,
                                (vehicle, classification) => classification);

                        return query.Distinct().ToList();
                    }
                    case DatabaseConstants.ClassificationTypeName.VehicleBody:
                    {
                        var query = baseQuery(context)
                            .Where(x => x.VehicleModel != null && x.VehicleModel.VehicleBody.Id > 0)
                            .Join(context.Classifications,
                                vehicle => vehicle.VehicleModel.VehicleBody.Id,
                                classification => classification.Id,
                                (vehicle, classification) => classification);

                        return query.Distinct().ToList();
                    }
                }

                return new List<Classification>();
            }
        }
    }
}
