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
                    {
                        var query = context.Vehicles.Include(x => x.VehicleModel)
                            .Where(x => x.VehicleModel != null && x.VehicleModel.Drivetrain.Id > 0)
                            .Join(context.Classifications,
                                vehicle => vehicle.VehicleModel.Drivetrain.Id,
                                classification => classification.Id,
                                (vehicle, classification) => classification);

                        return query.ToList();
                    }
                    case DatabaseConstants.ClassificationTypeName.Transmission:
                    {
                        var query = context.Vehicles.Include(x => x.VehicleModel)
                            .Where(x => x.VehicleModel != null && x.VehicleModel.Transmission.Id > 0)
                            .Join(context.Classifications,
                                vehicle => vehicle.VehicleModel.Transmission.Id,
                                classification => classification.Id,
                                (vehicle, classification) => classification);

                        return query.ToList();
                    }
                    case DatabaseConstants.ClassificationTypeName.PaymentStatus:
                        return GetByType(type);
                    case DatabaseConstants.ClassificationTypeName.Manufacturer:
                    {
                        var query = context.Vehicles.Include(x => x.VehicleModel)
                            .Where(x => x.VehicleModel != null && x.VehicleModel.VehicleManufacturer.Id > 0)
                            .Join(context.Classifications,
                                vehicle => vehicle.VehicleModel.VehicleManufacturer.Id,
                                classification => classification.Id,
                                (vehicle, classification) => classification);

                        return query.ToList();
                    }
                    case DatabaseConstants.ClassificationTypeName.Fuel:
                    {
                        var query = context.Vehicles.Include(x => x.VehicleModel)
                            .Where(x => x.VehicleModel != null && x.VehicleModel.FuelType.Id > 0)
                            .Join(context.Classifications,
                                vehicle => vehicle.VehicleModel.FuelType.Id,
                                classification => classification.Id,
                                (vehicle, classification) => classification);

                        return query.ToList();
                    }
                    case DatabaseConstants.ClassificationTypeName.VehicleBody:
                    {
                        var query = context.Vehicles.Include(x => x.VehicleModel)
                            .Where(x => x.VehicleModel != null && x.VehicleModel.VehicleBody.Id > 0)
                            .Join(context.Classifications,
                                vehicle => vehicle.VehicleModel.VehicleBody.Id,
                                classification => classification.Id,
                                (vehicle, classification) => classification);

                        return query.ToList();
                    }
                }

                return new List<Classification>();
            }
        }
    }
}
