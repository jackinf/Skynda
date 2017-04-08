using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.Results;
using Triven.Domain.UnitOfWorks;

namespace Triven.Domain.Repositories
{
    public interface IVehicleFeatureRepository<TVehicleFeatureEntity> : IBaseCrudRepository<TVehicleFeatureEntity>
        where TVehicleFeatureEntity : IVehicleFeature
    {
        IList<TVehicleFeatureEntity> GetAllBy(int vehicleId, IDbContext context = null);
        IList<TVehicleFeatureEntity> GetAllBy(int vehicleId, bool isActive);
    }
}