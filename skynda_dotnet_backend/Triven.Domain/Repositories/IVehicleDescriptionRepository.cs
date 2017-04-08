using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.UnitOfWorks;

namespace Triven.Domain.Repositories
{
    public interface IVehicleDescriptionRepository<TVehicleDescriptionEntity> : IBaseCrudRepository<TVehicleDescriptionEntity>
        where TVehicleDescriptionEntity : IVehicleDescription
    {
        IList<TVehicleDescriptionEntity> GetAllVehicleDescriptions(int vehicleId, IDbContext context = null);
    }
}