using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories
{
    public interface IVehicleFeatureRepository<TVehicleFeatureEntity> : IBaseCrudRepository<TVehicleFeatureEntity>
        where TVehicleFeatureEntity : IVehicleFeature
    {
        IList<TVehicleFeatureEntity> GetAllBy(int vehicleId);
        IList<TVehicleFeatureEntity> GetAllBy(int vehicleId, bool isActive);
    }
}