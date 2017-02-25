using System;
using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.Repositories
{
    public interface IVehicleFeatureRepository<TVehicleFeatureEntity> : IBaseCrudRepository<TVehicleFeatureEntity>
        where TVehicleFeatureEntity : IVehicleFeature
    {
        IList<TVehicleFeatureEntity> GetAllBy(int vehicleId);
        IList<TVehicleFeatureEntity> GetAllBy(int vehicleId, bool isActive);
        void DeleteEntity(TVehicleFeatureEntity vehicleDescription, DeleteResponseViewModel response);
    }
}