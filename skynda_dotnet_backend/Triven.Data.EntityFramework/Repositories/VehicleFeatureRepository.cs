using System.Collections.Generic;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.ViewModels.Common;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleFeatureRepository : BaseCrudRepository<VehicleFeature>, IVehicleFeatureRepository<VehicleFeature>
    {
        public IList<VehicleFeature> GetAllBy(int vehicleId)
        {
            throw new System.NotImplementedException();
        }

        public IList<VehicleFeature> GetAllBy(int vehicleId, bool isActive)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteEntity(VehicleFeature vehicleDescription, DeleteResponseViewModel response)
        {
            throw new System.NotImplementedException();
        }
    }
}