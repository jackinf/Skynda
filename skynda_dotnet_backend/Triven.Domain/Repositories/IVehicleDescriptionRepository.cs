using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories
{
    public interface IVehicleDescriptionRepository<TVehicleDescriptionEntity> : IBaseCrudRepository<TVehicleDescriptionEntity>
        where TVehicleDescriptionEntity : IVehicleDescription
    {
        IList<TVehicleDescriptionEntity> GetAllVehicleDescriptions(int vehicleId);
    }
}