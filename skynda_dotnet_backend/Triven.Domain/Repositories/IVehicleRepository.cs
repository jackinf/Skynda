using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Domain.Repositories
{
    public interface IVehicleRepository<TVehicleEntity> : IBaseCrudRepository<TVehicleEntity>
        where TVehicleEntity : IVehicle
    {
        IList<TVehicleEntity> Search(SearchRequestViewModel dto);
    }
}